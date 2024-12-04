# GPU pass through

>All information here are from this reddit article: https://www.reddit.com/r/homelab/comments/b5xpua/the_ultimate_beginners_guide_to_gpu_passthrough.
I wanted to keep a copy for myself here in case I want to create another VM with GPU pass through since this guide worked well for me.

Ensure that you **IOMMU** enabled in your BIOS settings!

## Configure Grub

```shell
nano /etc/default/grub
```

Search for the line
```txt
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

For AMD CPUs:
```txt
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on"
```

For Intel CPUs:
```txt
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"
```

>   Additional commands 
    <br/>
    You might need to add additional commands to this line, if the passthrough ends up failing. For example, if you're using a similar CPU as I am (Xeon E3-12xx series), which has horrible IOMMU grouping capabilities, and/or you are trying to passthrough a single GPU.
    These additional commands essentially tell Proxmox not to utilize the GPUs present for itself, as well as helping to split each PCI device into its own IOMMU group. This is important because, if you try to use a GPU in say, IOMMU group 1, and group 1 also has your CPU grouped together for example, then your GPU passthrough will fail.
    Here are my grub command line settings:
    <br/>
    ```
    GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction nofb nomodeset video=vesafb:off,efifb:off"
    ```
    For more information on what these commands do and how they help:<br/>
    A. Disabling the Framebuffer: video=vesafb:off,efifb:off<br/>
    B. ACS Override for IOMMU groups: pcie_acs_override=downstream,multifunction
    When you finished editing /etc/default/grub run this command:

```shell
update-grub
```

## VFIO Modules

```shell
nano /etc/modules
```

Paste the following lines into the file:

```txt
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

## IOMMU interrupt remapping

```shell
echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf
echo "options kvm ignore_msrs=1" > /etc/modprobe.d/kvm.conf
```

## Blacklisting Drivers

The proxmox host should not use the GPUs, therefore, we blacklist the drivers.

```shell
echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf
```

## Adding GPU to VFIO

```shell
lspci -v
```



Your shell window should output a bunch of stuff. Look for the line(s) that show your video card. It'll look something like this:

```shell
01:00.0 VGA compatible controller: NVIDIA Corporation GP104 [GeForce GTX 1070] (rev a1) (prog-if 00 [VGA controller])

01:00.1 Audio device: NVIDIA Corporation GP104 High Definition Audio Controller (rev a1)
```
Make note of the first set of numbers (e.g. `01:00.0` and `01:00.1`). We'll need them for the next step.

Run the command below. Replace 01:00 with whatever number was next to your GPU when you ran the previous command:

```shell
lspci -n -s 01:00
```

Doing this should output your GPU card's Vendor IDs, usually one ID for the GPU and one ID for the Audio bus. It'll look a little something like this:

```shell
01:00.0 0000: 10de:1b81 (rev a1)

01:00.1 0000: 10de:10f0 (rev a1)
```

What we want to keep, are these vendor id codes: `10de:1b81` and `10de:10f0`.

Now we add the GPU's vendor id's to the VFIO (remember to replace the id's with your own!):
```shell
echo "options vfio-pci ids=10de:1b81,10de:10f0 disable_vga=1"> /etc/modprobe.d/vfio.conf
```

```shell
update-initramfs -u
```

### Sources

- https://pve.proxmox.com/wiki/PCI_Passthrough
- https://www.reddit.com/r/homelab/comments/b5xpua/the_ultimate_beginners_guide_to_gpu_passthrough/
- https://www.youtube.com/watch?v=S6jQx4AJlFw&t=870s
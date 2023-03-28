# Proxmox

## How to mount a new storage disk

1. Find out the drives available

```sh
lsblk
```

2. Install parted

```sh
apt install parted -y
```

3. Apply label to the drive

```sh
parted /dev/<your-drive> mklabel gpt
```

4. Create a partition using the full drive

```sh
parted -a opt /dev/<your-drive> mkpart primary ext4 0% 100%
```
5. Give the drive a name

```sh
mkfs.ext4 -L <enter-a-name-for-the-drive> /dev/<drive-partition-name>
```

Best check again with `lsblk` to find out the correct `<drive-partition-name>`.

6. Create mount directory for Proxmox to mount to

```sh
mkdir -p <path-to-mount>
```

Example could be `/mnt/data`

7. Add to fstab for automatic mount on reboot

```sh
nano /etc/fstab
```

Add the entry
```txt
LABEL=<your-drive-name> <mount-path> ext4 defaults 0 2
```

Example assuming your drive name is `myStorage` from step 5. and mount path was `/mnt/data`, then set

```txt
LABEL=myStorage /mnt/data ext4 defaults 0 2
```

Sources:

- <https://bobcares.com/blog/add-additional-drive-in-proxmox/>
- <https://virtualizeeverything.com/2021/10/17/how-to-add-storage-dive-to-proxmox-7/>

## How to SSH into your LXC

- <https://forum.proxmox.com/threads/cannot-ssh-to-new-container.38114/>

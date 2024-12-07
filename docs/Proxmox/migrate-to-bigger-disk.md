# Migrate to a bigger disk

## Tools

- [Balena Etcher](https://etcher.balena.io/)
- [Clonezilla](https://clonezilla.org/downloads.php)

## Create a bootable USB drive

1. Download Clonezilla as an ``.iso`` file
2. Use Balena Etcher to create a bootable USB drive
3. Connect both drives, source and target with you PC
4. Plug the USB stick in your PC and boot from it
5. Start the computer and run Clonezilla live


## Resize the new drive

First resize the physical disk.

Check with `pvdisplay` the physical drives.
My new 1TB SSD is shown as ``nvme0n1p3``.
Afterwards, I ran the resize command.

```shell
pvresize /dev/nvme0n1p3
```

Resize the logical volume

```shell
lvresize --extents +100%FREE --resizefs pve/data
```

- https://www.youtube.com/watch?v=xnKet-5REXM
- https://blog.dgprasetya.com/promox-extend-lvm-partition-ofly/
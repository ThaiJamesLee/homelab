# How to mount SMB drives

> **NOTE:**
> This will not work with unprivileged LXC containers.


Create a directory to as a mount point.

```shell
sudo chown -R plex /home/plex/ImmichAlbum/
```


```shell
sudo nano /etc/fstab
```

```text
//192.168.20.59/Books /home/Books cifs credentials=/home/.smbcr
```

- https://ubuntu.com/server/docs/how-to-mount-cifs-shares-permanently
- https://pve.proxmox.com/wiki/Unprivileged_LXC_containers#Using_local_directory_bind_mount_points
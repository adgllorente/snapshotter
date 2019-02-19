# go-snapshots

This tool generates snapshots when a URL is visited.

# Parameters

Tool may be configured using these parameters:

- BASE: URL of the website to create snapshots, for example: https://www.movistarplay.cl
- DESTINATION: Folder where snapshots will be stored.
- PORT (Optional - Default: 3000): Port where app will be listening
- VALID_SIZE (Optional - Default 50): Minimum size in Kbs to consider a snapshot valid
- USER (Optional): Basic auth username
- PASS (Optional): Basic auth password

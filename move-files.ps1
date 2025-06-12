# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "public\App icons"
New-Item -ItemType Directory -Force -Path "public\cursors"
New-Item -ItemType Directory -Force -Path "public\logo"

# Move App icons
Copy-Item "App icons\*" -Destination "public\App icons" -Force

# Move cursors
Copy-Item "cursors\*" -Destination "public\cursors" -Force

# Move logo
Copy-Item "logo\*" -Destination "public\logo" -Force

# Move root files
Copy-Item "ICON2.png" -Destination "public" -Force
Copy-Item "ICON3.png" -Destination "public" -Force
Copy-Item "mac wallpaper 3.png" -Destination "public" -Force
Copy-Item "control-center-icon.png" -Destination "public" -Force
Copy-Item "siri__fsb5b98qe526_og-removebg-preview.png" -Destination "public" -Force
Copy-Item "Gallery_vienna.jpg" -Destination "public" -Force 
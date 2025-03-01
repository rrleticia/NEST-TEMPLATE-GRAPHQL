// !/bin/bash

# Run the Prisma migrate command
# Find the path to npx
NPX_PATH=$(which npx)

if [ -z "$NPX_PATH" ]; then
    echo "npx command not found."
    exit 1
fi

npx prisma migrate dev

cd prisma || { echo "Folder 'prisma' does not exist."; exit 1; }

# Check if the 'migrate' folder exists and delete it
if [ -d "migrations" ]; then
    # Navigate to the 'prisma' folder
    rm -rf migrations
    echo "Folder 'migrate' has been deleted."
else
    echo "Folder 'migrate' does not exist."
fi


#!/usr/bin/env python3
import json
import os
import sys

if len(sys.argv) < 2:
	print("usage: ./build.py <brand>")
	sys.exit(1)

brand_slug = sys.argv[1]
brand_file = f'./brands/{brand_slug}/info.json'

if not os.path.exists(brand_file):
	print(f"{brand_slug} is not a valid a brand")
	sys.exit(1)

brand = json.load(open(brand_file, "r"))

print("Creating working copy of app...")

os.system('rm -Rf build/')
os.system('rsync -a app/ build')
os.system(f'rsync -a brands/{brand_slug}/assets/ build/assets')

print("Renaming placeholders...")

os.system(f'cd build && find . -type f -exec sed -i "s/\\$BRAND\\\$/{brand["name"]}/g" {{}} +')
os.system(f'cd build && find . -type f -exec sed -i "s/\\$DOMAIN\\\$/{brand["domain"]}/g" {{}} +')

print("Packaging app...")

os.system('cd build && zat package')
# 3ds-theme-parser
Parses and extracts 3DS body_LZ.bin theme files.

# CLI
```
Usage: 3ds-theme-parser body_lz_bin [output_directory] [options]

Options:
  --save-body, -B        Save the extracted body.bin                   [boolean]
  --pretty-json, -p      Format the JSON with indents                  [boolean]
  --save-json, -j, -A    Write JSON of the body_LZ data to data.json   [boolean]
  --output-json, -J      Write JSON of the body_LZ data to STDOUT      [boolean]
  --save-images, -i, -A  Save the images                               [boolean]
  --save-cwavs, -c, -A   Save the CWAV sound effects                   [boolean]
  --apply-alpha, -a      Apply alpha masks to the folder images        [boolean]
  --process-borders, -b  Process the icon border into a complete image [boolean]
  --json-textures        Include the textures in the output JSON
                         WARNING: RESULTS IN LARGE JSON!               [boolean]
  --json-cwavs           Include the CWAVs in the output JSON
                         WARNING: RESULTS IN LARGE JSON!               [boolean]
```

# API Reference
{{>main}}

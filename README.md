# loganalyzer

This is a general log analysis tool that helps anyone to take an easier approach at filtering the critical lines they care about, do some processing for the matching fields, and output critical results for potential automation pipeline.

# Usage:

The core of the log analysis tool revolves around a configuration file that users can customize.

```javascript
{
  "debug": "Set to true for debug output or leave the option out for non-debug",
  "jsonOutput": "true or leave the option out for normal output",
  "filters": [{
    "pattern": "Regular expression matching each line, with brackets capturing interested fields",
    "desc": "Description of this particular filter" 
    "fields": [{
      "name": "Name of first matched field",
      "color": "Color of your matched field in the output"
    }, {
      "name": "Name of second matched field",
      "color": "Color of your matched field in the output"
    },
    ...
    ]
  }, {
    "pattern": "Second pattern to recognize",
    "desc": "Second filter",
    ...
  }]
}
```

Please see [samples/configs](https://github.com/hiryanchen/loganalyzer/tree/master/samples/configs) for actual examples

When running on a single log file:

`node main.js {config_file_path} {log_file_path}`

When running on a pipe stream, for example, a logcat from the Android Debug Bride (ADB logcat):

`{stream input. i.e. adb logcat} | node main.js {config_file_path}`

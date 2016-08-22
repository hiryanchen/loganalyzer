const a = new LogAnalyzer({
  debug: true,
  filters: [{
    pattern: 'Error'
  }]
});
a.analyze('0:00 Start\n0:05 Error\n0:10 End', (line) => {
  console.log(line);
});

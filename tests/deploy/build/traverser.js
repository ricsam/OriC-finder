// Generated by CoffeeScript 1.9.0
(function() {
  var filter, initiate, traverseCommander, tree;

  importScripts('./traverser-algoritms.js');

  tree = {
    branches: {}
  };

  filter = new CandidateFilter();

  traverseCommander = new EventListener();

  initiate = function(input) {
    var dna, i, k, seq, _i, _ref;
    self.input = input;
    k = self.k = input.k;
    dna = input.DNA.lines.join('');
    for (i = _i = 0, _ref = dna.length - k; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      seq = dna.substr(i, k);
      namespace(i, seq);
      traverseCommander.walk();
      new Traverser(seq, i, 2);
      new Traverser(reverseComplement(seq), i, 2, true);
    }
    traverseCommander.walk(k);
    filter.clean();
    return self.postMessage(filter);
  };

  self.addEventListener(function(message) {
    return initiate(message.data);
  });

}).call(this);

//# sourceMappingURL=traverser.js.map

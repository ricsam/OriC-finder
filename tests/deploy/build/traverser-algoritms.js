// Generated by CoffeeScript 1.9.0
(function() {
  importScripts('../lib/underscore-min.js');

  this.namespace = function(start_point, string) {
    var b, index, ns, p, spts, _i, _len, _results;
    ns = string.split('');
    b = self.tree;
    _results = [];
    for (index = _i = 0, _len = ns.length; _i < _len; index = ++_i) {
      p = ns[index];
      if (b.branches.hasOwnProperty(p)) {
        b = b.branches[p];
      } else {
        b.branches[p] = {
          spts: [],
          branches: {},
          value: p
        };
        b = b.branches[p];
      }
      spts = index + start_point;
      b.maxspts = spts;
      _results.push(b.spts.push(spts));
    }
    return _results;
  };

  this.reverseComplement = function(string) {
    var complements, i, ns, _i, _len;
    complements = {
      "A": "T",
      "T": "A",
      "G": "C",
      "C": "G"
    };
    ns = "";
    for (_i = 0, _len = string.length; _i < _len; _i++) {
      i = string[_i];
      ns = complements[i] + ns;
    }
    return ns;
  };

  this.EventListener = (function() {
    function EventListener() {}

    EventListener.prototype.funcs = [];

    EventListener.prototype.listen = function(f, context) {
      if (context == null) {
        context = null;
      }
      this.funcs.push({
        func: f,
        context: context
      });
      return this.funcs.length - 1;
    };

    EventListener.prototype.dismiss = function(i) {
      return this.funcs[i] = false;
    };

    EventListener.prototype.walk = function(n) {
      var f, i, _i, _results;
      if (n == null) {
        n = 1;
      }
      _results = [];
      for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
        _results.push((function() {
          var _j, _len, _ref, _results1;
          _ref = this.funcs;
          _results1 = [];
          for (_j = 0, _len = _ref.length; _j < _len; _j++) {
            f = _ref[_j];
            if (f) {
              _results1.push(f.func.call(f.context));
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return EventListener;

  })();

  this.Traverser = (function() {
    function Traverser(_at_sequence, _at_start_point, threshold, _at_reverse_complement) {
      var base_tollerance, bp, subpath, _ref;
      this.sequence = _at_sequence;
      this.start_point = _at_start_point;
      if (threshold == null) {
        threshold = 1;
      }
      this.reverse_complement = _at_reverse_complement != null ? _at_reverse_complement : false;
      this.paths = [];
      this.distance_traveled = 0;
      base_tollerance = threshold + 1;
      this.commander_id = self.traverseCommander.listen(this.walk, this);
      _ref = self.tree.branches;
      for (bp in _ref) {
        subpath = _ref[bp];
        this.spawn({
          tollerance: this.isTollerated(bp) ? base_tollerance : base_tollerance - 1,
          subpath: subpath.branches,
          bp: bp,
          spts: subpath.spts,
          stroll: [bp]
        });
      }
    }

    Traverser.prototype.isOutOfRange = function(maxspts, stroll) {
      var lower, upper;
      lower = maxspts < this.start_point - input.window_size;
      upper = this.start_point < self.input.k;
      return lower || upper;
    };

    Traverser.prototype.isTollerated = function(bp) {
      return this.sequence[this.distance_traveled] === bp;
    };

    Traverser.prototype.spawn = function(ob) {
      return this.paths.push(ob);
    };

    Traverser.prototype.walk = function() {
      var bp, deletion, index, path, subpath, ts, _i, _len, _ref, _ref1;
      this.distance_traveled++;
      deletion = [];
      _ref = this.paths;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        path = _ref[index];
        path["delete"] = true;
        _ref1 = path.subpath;
        for (bp in _ref1) {
          subpath = _ref1[bp];
          if (this.isOutOfRange(subpath.maxspts, path.stroll.join(''))) {
            continue;
          }
          ts = {
            tollerance: this.isTollerated(bp) ? path.tollerance : path.tollerance - 1,
            subpath: subpath.branches,
            bp: bp,
            spts: subpath.spts,
            stroll: path.stroll.concat(bp)
          };
          this.spawn(ts);
        }
      }
      this.paths = _.reject(this.paths, function(ob) {
        return !!ob["delete"];
      });
      this.validatePaths();
      if (this.distance_traveled >= self.input.k - 1) {
        return this.end();
      }
    };

    Traverser.prototype.validatePaths = function() {
      var deletion, index, path, _i, _len, _ref;
      deletion = [];
      _ref = this.paths;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        path = _ref[index];
        if (path.tollerance <= 0) {
          path["delete"] = true;
        }
      }
      return this.paths = _.reject(this.paths, function(ob) {
        return !!ob["delete"];
      });
    };

    Traverser.prototype.end = function() {
      self.postMessage({
        message: 'filter-push',
        data: {
          paths: this.paths,
          reverse_complement: this.reverse_complement,
          sequence: this.sequence,
          start_point: this.start_point
        }
      });
      return self.traverseCommander.dismiss(this.commander_id);
    };

    return Traverser;

  })();

}).call(this);

//# sourceMappingURL=traverser-algoritms.js.map

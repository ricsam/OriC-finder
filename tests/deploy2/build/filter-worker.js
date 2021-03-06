// Generated by CoffeeScript 1.9.0
(function() {
  var CandidateFilter, done, filter,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  importScripts('../lib/underscore-min.js');

  CandidateFilter = (function() {
    CandidateFilter.prototype.max_candidates = [];

    function CandidateFilter() {
      this.clean = __bind(this.clean, this);
      _.bind(this.clean, this);
      this;
    }

    CandidateFilter.prototype.max = 0;

    CandidateFilter.prototype.push = function(traverser) {
      var candidate;
      if (traverser.paths.length >= this.max) {
        candidate = this.createCandidate(traverser);
        if (candidate.sequences.length > this.max) {
          this.max++;
          this.max_candidates = _.filter(this.max_candidates, function(candidate) {
            return candidate.rank >= this.max;
          });
        }
        return this.max_candidates.push(candidate);
      }
    };

    CandidateFilter.prototype.createCandidate = function(traverser) {
      var candidate;
      candidate = {
        reverse_complement: traverser.reverse_complement
      };
      candidate.sequences = this.ftptcs(traverser);
      candidate.rank = candidate.sequences.length;
      return candidate;
    };

    CandidateFilter.prototype.fromTraverserPathToCandidateSequence = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.ftptcs.apply(this, args);
    };

    CandidateFilter.prototype.ftptcs = function(traverser) {
      var i, path, sequence, sequences, spt, _i, _j, _len, _len1, _ref, _ref1;
      sequences = [
        {
          seq: traverser.sequence,
          spt: traverser.start_point
        }
      ];
      _ref = traverser.paths;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        _ref1 = path.spts;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          spt = _ref1[i];
          spt = spt - self.input.k;
          if (spt < traverser.start_point - input.window_size) {
            continue;
          }
          sequence = {
            seq: path.stroll.join(""),
            spt: spt
          };
          sequences.push(sequence);
        }
      }
      sequences.sort(function(a, b) {
        return a.spt - b.spt;
      });
      sequences = this.groupOverlaps(sequences);
      return sequences;
    };

    CandidateFilter.prototype.groupOverlaps = function(sequences) {
      var gindex, groups, i, sequence, _i;
      groups = [];
      gindex = 0;
      for (i = _i = sequences.length - 1; _i >= 0; i = _i += -1) {
        sequence = sequences[i];
        if (i > 0) {
          if (sequences[i - 1].spt > sequence.spt - self.input.k) {
            if (!groups[gindex]) {
              groups.push([]);
            }
            groups[gindex] = groups[gindex].concat([sequence, sequences[i - 1]]);
          } else {
            groups[gindex] = _.uniq(groups[gindex]);
            groups[gindex++] = [sequence];
          }
        }
      }
      return groups;
    };

    CandidateFilter.prototype.clean = function() {
      return this.max_candidates = _.reject(this.max_candidates, (function(_this) {
        return function(candidate) {
          return candidate.rank < _this.max;
        };
      })(this));
    };

    return CandidateFilter;

  })();

  filter = new CandidateFilter();

  done = function() {
    filter.clean();
    return self.postMessage({
      message: 'filter-return',
      data: {
        candidates: filter.max_candidates
      }
    });
  };

  self.addEventListener('message', function(ev) {
    var data, message;
    data = ev.data.data;
    message = ev.data.message;
    switch (message) {
      case 'filter-init':
        this.input = data.input;
        return this.max_filter = input.dna_length * 2 - self.input.k * 2;
      case 'filter-push':
        filter.push(data);
        return self.postMessage({
          message: 'filtered-one'
        });
      case 'filter-return':
        return done();
    }
  });

}).call(this);

//# sourceMappingURL=filter-worker.js.map

// Generated by CoffeeScript 1.9.0
(function() {
  var data, dna_length, done_count, end, filterWorker, interval_check, is_ended, last_kmers, mainWorker, percent, perinterval, traverserWorker;

  mainWorker = new Worker('./build/traverser.js');

  filterWorker = new Worker('./build/filter-worker.js');

  traverserWorker = new Worker('./build/traverser-worker.js');

  end = function(data) {
    return console.log(data);
  };

  mainWorker.addEventListener('message', function(ev) {
    var data, message;
    message = ev.data.message;
    data = ev.data.data;
    switch (message) {
      case 'traverse-init':
        return traverserWorker.postMessage({
          message: 'traverse-init',
          data: data
        });
      case 'traverse':
        return traverserWorker.postMessage({
          message: 'traverse',
          data: data
        });
      case 'walk':
        return traverserWorker.postMessage({
          message: 'walk',
          data: data
        });
      case 'request-filter-return':
        return filterWorker.postMessage({
          message: 'filter-return'
        });
    }
  });

  is_ended = 0;

  done_count = 0;

  last_kmers = 0;

  interval_check = setInterval((function() {
    if (is_ended === 0) {
      done_count++;
    } else {
      done_count = 0;
    }
    if (done_count > 20) {
      console.log('almost done');
      last_kmers++;
      if (last_kmers === 1) {
        is_ended = 0;
        done_count = 0;
        return traverserWorker.postMessage({
          message: 'walk',
          data: {
            times: data.k
          }
        });
      } else if (last_kmers === 2) {
        console.log('absolutly done');
        window.clearInterval(interval_check);
        return filterWorker.postMessage({
          message: 'filter-return'
        });
      }
    }
  }), 100);

  percent = 0;

  perinterval = setInterval((function() {
    var val;
    val = Math.round((percent / data.dna_length) * 100);
    console.log(val, "%");
    if (val === 100) {
      return window.clearInterval(perinterval);
    }
  }), 1000);

  filterWorker.addEventListener('message', function(ev) {
    var data, message;
    message = ev.data.message;
    data = ev.data.data;
    switch (message) {
      case 'filter-return':
        return end(data);
      case 'filtered-one':
        return is_ended--;
    }
  });

  traverserWorker.addEventListener('message', function(ev) {
    var data, message;
    message = ev.data.message;
    data = ev.data.data;
    switch (message) {
      case 'filter-push':
        is_ended++;
        percent += 0.5;
        return filterWorker.postMessage({
          message: 'filter-push',
          data: data
        });
      case 'filter-init':
        return filterWorker.postMessage({
          message: 'filter-init',
          data: data
        });
    }
  });

  window.go1 = function() {
    return traverserWorker.postMessage({
      message: 'walk',
      data: {
        times: 9
      }
    });
  };

  window.go2 = function() {
    return filterWorker.postMessage({
      message: 'filter-return'
    });
  };

  window.go3 = function() {
    return clearInterval(x);
  };

  data = {
    window_size: 500,
    mutation_threshold: 2,
    k: 9,
    DNA: {
      line_length: 70,
      lines: ["CGCAGGTTGAGTTCCTGTTCCCGATAGATCCGATAAACCCGCTTATGATTCCAGAGCTGTCCCTGCACAT", "TGCGCAGATACAGGAAACACAGACCAAATCCCCATCTCCTGTGAGCCTGGGTCAGTCCCACCAGAAGAGC", "GGCAATCCTGTCGTTCTCCGCTGCCAGTCGCGGACGATAGCGAAAGCAGGTCTCGGATATCCCAAAAATC", "CGACAGGCCAGCGCAATGCTGACCCCATGATGCGCCACAGCTTGTGCGGCCAGTTCCCGGCGCTGGGCTG", "GCCGCTTCATTTTTTTCCAAGGGCTTCCTTCAGGATATCCGTCTGCATGCTCAAATCCGCATACATGCGC", "TTCAGCCGACGGTTCTCCTCTTCCAAAGCCTTCATCTGACTGATCATCGAAGCATCCATGCCGCCATATT", "TCGCGCGCCACCGGTAAAACGTGGCGTTGCTGATCCCATGCTCCCGACACAGGTCAGGAACCGGGACACC", "GCCCTCAGCCTGGCGGATCACACCCATGATCTGGGCGTCAGTAAAGCGATCACTCTTCATCAGAATCTCC", "TCAATTCTTACGCTGAGAAAATTCTCATTCAAAAGTCACTCTTTTTATGGGGGGATTACCCGCTGTCTGG", "AACAGGTTATGGAGTGGCGCGGCAGGCCAGAAGCCATCCGAATGGATAATGGCCCTGAATATGTCAGTCA", "CATGGCGGACAGGCTTTTGGATGGACGCGCTTTTCGGCTCCTGAACATCCTGGATGAGTTCAATCGTGAA"]
    }
  };

  dna_length = data.DNA.line_length * (data.DNA.lines.length - 1) + data.DNA.lines[data.DNA.lines.length - 1].length;

  data.dna_length = dna_length;

  mainWorker.postMessage(data);

}).call(this);

//# sourceMappingURL=main.js.map

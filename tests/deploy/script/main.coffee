
do ->

	worker = new Worker('./traverser.js')

	worker.postMessage
		DNA:
			lines: [
				"CGCAGGTTGAGTTCCTGTTCCCGATAGATCCGATAAACCCGCTTATGATTCCAGAGCTGTCCCTGCACAT", "TGCGCAGATACAGGAAACACAGACCAAATCCCCATCTCCTGTGAGCCTGGGTCAGTCCCACCAGAAGAGC",
				"GGCAATCCTGTCGTTCTCCGCTGCCAGTCGCGGACGATAGCGAAAGCAGGTCTCGGATATCCCAAAAATC", "CGACAGGCCAGCGCAATGCTGACCCCATGATGCGCCACAGCTTGTGCGGCCAGTTCCCGGCGCTGGGCTG",
				"GCCGCTTCATTTTTTTCCAAGGGCTTCCTTCAGGATATCCGTCTGCATGCTCAAATCCGCATACATGCGC", "TTCAGCCGACGGTTCTCCTCTTCCAAAGCCTTCATCTGACTGATCATCGAAGCATCCATGCCGCCATATT",
				"TCGCGCGCCACCGGTAAAACGTGGCGTTGCTGATCCCATGCTCCCGACACAGGTCAGGAACCGGGACACC", "GCCCTCAGCCTGGCGGATCACACCCATGATCTGGGCGTCAGTAAAGCGATCACTCTTCATCAGAATCTCC",
				"TCAATTCTTACGCTGAGAAAATTCTCATTCAAAAGTCACTCTTTTTATGGGGGGATTACCCGCTGTCTGG", "AACAGGTTATGGAGTGGCGCGGCAGGCCAGAAGCCATCCGAATGGATAATGGCCCTGAATATGTCAGTCA",
				"TACGTTGGTTTCATGGGCCGAAAAACAGGGGATTACCCTGATCTATACGCAACCGGGTAATCCGCAGCAG", "AACGCCTATATTGAACGCTACAACAGAACTGTCCGGCAGGAATGGCTGGAGCAGTATCTGTTTGAAAGCA",
				"TTCAGGACGTGCAGGAGGTCGCAACACAATGGCTCTGGACATATAACCATGACAGACCCAACATGGGGAA", "CAGCGGGCTAACCCCCGCCCAGAAACTAAAAACAGCTGCCTGAATTCTCATTCAATGCCCCACTAAAAAT",
				"GGGGGGATTACCACTCTAAATCAATGCATTCCAATTAACTTATAAAATGCTTTGAGAGTCATCACCTACA", "GCAAAGAACTCTGCTGACACCTCTGAAATCATTTTGAGCCATAAAAACTGGGCTCGATTGACGTCCTGAA",
				"ACTCATCAGCCATCACGGCTGTGAAACGGCGTGACCAGCGGTAGCGATAGGCATCATTGTGCAGCATTGC", "CAATGTCGGCCACATCAACAGATCCCCAAAATCTGCAGCATTCTGTTCGCGCAGCAAACTCTGGTAACGA",
				"CCATACAACTCAACCACATAGCGCCAGCCCGCATCGTCCATAAAACGTTTCTGGGCATGTGCTCGCGCTA", "TCATGGCTTCAACATGATGCCCTGCCATCTCAGGCGTCACCAGATCTTCCTTCAAACGAGATGGGGTGGT",
				"TGCCGTCCTCCCCGCACGGCATCGCAATGTGCCAGAATGGTCGTTGGAAGAAACGACTGCGCGAAAGGAC", "GGCAGATGAAGGATACAGTGATAGGCGTTGATCTGGCAAAGAACATTTTCCAGGTTCATGGAGCTTCGCG",
				"TGCGGGCGAGGTGATGTTTCGCAAAAAGCTGCGTCGTCAGCAGTTTATGCAGTTCATGGCCACGCAGCCG", "CCTGCTCTGGTCGTTCTTGAAGCGTGCGGGAGCGCGCATTACTGGGCTCGCGAACTGGCAGGAGCTGGTC",
				"ACGAGGTCAGACTGATCGCTCCGCAGTATGTGAAGCCTTTCGTGAAGCGCCAGAAGAACGATGCTGCTGA", "TGCGGAAGCGATCGTCATTGCGGCCCGTCAGCCGGAAATGCGCTTTGTCGAACCACGCACTGAAGCGCAG",
				"CAGGCGCGTGGCGTTCTTTTCCGGGCCCGGCAGCGTCTGGTGCACCAGCGCACGGAACTGGTGAATGCCC", "TGCGTGCCGTTCTGTATGAATTCGGTCTCGTCGTGCCACAGGGGATTGCGCATATCAGACACATTGAAGC",
				"CATGCTGGATGAGGCGGTTCTGCCAGAGGCTGTGAAGCAGGAATGCCTTGATCTGCTGCGACAGATTTCG", "GAGCAGAGTGTGCGGATTGATGTCAGAACAAAGAAGATCAGGATGCTTGCCCAGGAAAGTGAAAACACCT",
				"GCAGATTGCAGAGCATGCCTGGAGTGGGTCCTCTGACCGCTCTTGCGATTGAAGCTTTTGCGCCTGACCT", "GCAGAGCTTCCGGCGCGGGCGCGACTTTGCTGCGTGGCTGGGGCTGGTGCCCCGTCAGTTCTCATCTGGC",
				"GGAAAGGAAAGGCTGGGGAAGATATCAAAAGCCGGGCAGGCTGATATCCGCAGGCTTCTCATCATGGGCG", "CCATGACCCAGGTGAACTGGGCCAGCCGTAAGGCCCCTGCACCGGGAAGCTGGCTGGCACGGATGCTGGC",
				"CCGCAAGCCCCGTATGCTGGTAGCCATTGCGCTGGCCAACAGGATGGCACGAGCCATCTGGGCCATGGCA", "ACAAAACAGGAGGATTATCGGGATCCGGCCCTGTCCGTGGCAGCCTGAGCGATGGCTCGGCTCCCGCGGA",
				"TGGAACCGGTAGGGGTGTGAGAGGGCGATGACCTGAATGGGCGCATGATCGTCTGATCCGGATCGGAAAA", "ACCAGTGGATTTCTCTGTGCTTTAAAGCACGCCTGTGAGATTTGGATCTGATCCGCTGATCACCATACTG",
				"GCCAGTGGCTTCTGAAAGGCCACATCAACAGGCCTTACAGAAGACCGCACACGATCACACGTCAATATGG", "GTCAGAAAACTCTTGCATAACGGACGGCAACCATATGTGGACGGCTCCCCCTTGCAAGAGGCTAGGCAAG",
				"AAAATGATCGGATCTTTGCTTCCATATGTCCGGCCTGTTGATGCGGCCATAGGGTCGCTGGCCAAGATGG", "CTTCCGCAGCGTGAGCCCCAAACACAGAAGCGGTCTTTGATGACCACTGGTTGCCACGGGTTTTCTCACG",
				"CCATGGATCGATCGATCACACCATCTGCTCTATTACTTGCAAGCCACGACCTCAGCTCGGCACGAGAGCG", "TCAAATGTCAGCGCATCGTGCCAGGCTAAGCTCAAACAGCAGCTGCGCCGGGTTGCTGCAGAAGGCGCTT",
				"ATAGTGTTCGCCGCTGACCATCAGTTTCCAAGCAATCCGCGCAATCTTATTGGCAAGGGCCACCGCTGCG", "AGTTTCGGTTTTTTGCGCTCCAGCAATTCACGTAACCAAGATGAGGCATTCTTCCCATTGGTCCGCCGGG",
				"CATGCGACACGACTGCGGTCGCGCCAACCACCAGCGTGCTTCGCAAGACCTCATCGCCAGCGCGTGTGAT", "TCTGCCAAGCCTTGTTTTTCCACCGGTTGAGTGATCCCTGGGCGTCAATCCGATCCAGGCCGCAAAGGCT",
				"CGACCCGATTTGAACAGATGCGGATCAGGCGTTTTCATCATCAGCAGCGCTGCGCCGATCGGGCCAACGC", "CCGGAATTTTCGCAAGACGCTGACTGCATTCGTTGGCGCGGTGCCATGCCATCACCTTGCCCTCAAGCTG",
				"TTCGATTTCACCTTGCAATTCAGCATATTCCTTTGCGTGAAGGGCAAACAACTCGCGCGTCAATGTGGGC", "AGGCTTTCGTCCGCAGCGATCCGATCAAGGAGTGCCTCAATCCGGCACATGCCTTTGGGCGCCGTGATCC",
				"CAAACTCGGCAGCATATCCCCGGATCGTATTGGCGAGCTGTGTGCGGTTCCGGATAAGTCGTGCCCGCAT", "TCCAATCAGCATCAACGCTGCCTGCTCTTCCTCGCTCTTGAGCGGGACGAACCGCATTGTAGGCCGACTC",
				"ATCGCTTCACAGAGGGCTTCCGCGTCGGCGGCATCGTTTTTCCCGCGCTTGACATAAGGCTTCACGAGCT", "GCGGCGCGATCAGCTTCACTGTGTGTCCCAGACACGAGAGCACCCGCCCCCAGTAATGGGAGGCGCCACA",
				"GGCCTCAATCGCGATTTCAATCGGGGGCAGTTTCTCAAAAAACTTTACCATCTCCCGGCGGGATAGCTTC", "CTGCGCAAAACAGGCTGCTCCTTCGCGTTTACACCGTGCAATTGGAAAACACTTTTTGACGTGTCCATGC",
				"CAATACGGATAATTTGTTCCATGGGTGGCCTCCTCTGTGAGTTCTGCAACGACTTCACCTTGGCACATCG", "CGATGCCGTTGGGAGCCGTCCACCCCATCACAGAAGAAATCCGCGTCGAGCTGAGCTACGGCGCCGAGCA",
				"CCTGCAGCGAGAACATACCCTGCGGGGTCGTAGTGTCGATGGGGTCGTCCAAACTACGGAAATGCGCGCC", "CTGCCAGTCCTCCTGACCGAGATAACGGATCAGTCCCGTGAGTTCGTCTGCGGCCATGGCTGCTCCTGCG",
				"CATGGCGGACAGGCTTTTGGATGGACGCGCTTTTCGGCTCCTGAACATCCTGGATGAGTTCAATCGTGAA"]
			line_length: 70

		window_size: 500
		mutation_threshold: 2
		k: 9

	worker.addEventListener 'message', (output) ->
		console.log output.data
MB.tests.GuessCase = (MB.tests.GuessCase) ? MB.tests.GuessCase : {};

MB.tests.GuessCase.Sortname = function() {
    QUnit.module('Guess Case');
    QUnit.test('Sortname', function() {

        var tests = [
            {
                input: 'Members Of Mayday',
                expected: 'Members Of Mayday',
                person: false
            },
            {
                input: 'The Prodigy & Tom Morello',
                expected: 'Prodigy, The & Morello, Tom',
                person: true
            },
            {
                input: 'DJ Shadow',
                expected: 'Shadow, DJ',
                person: true
            }
        ];

        $.each(tests, function(idx, test) {
            var result = MB.GuessCase.artist.sortname (test.input, test.person);
            QUnit.equals(result, test.expected, test.input);
        });

        tests = [
            {
                input: 'Da! Heard It Records',
                expected: 'Da! Heard It Records'
            },
            {
                input: "The Cadenza Collection",
                expected: "Cadenza Collection, The"
            },
            {
                input: "Los Enanos Gigantes",
                expected: "Enanos Gigantes, Los"
            }
            /* FIXME: improve article code.  These should be handled.
            {
                input: "L'Amicale underground",
                expected: "Amicale underground, L'"
            },
            {
                input: "Les Industries Musicales et Électriques Pathé Marconi",
                expected: "Industries Musicales et Électriques Pathé Marconi, Les"
            },
            {
                input: "Die Schöne Blumen Musik Werk",
                expected: "Schöne Blumen Musik Werk, Die"
            }
            */
        ];

        $.each(tests, function(idx, test) {
            var result = MB.GuessCase.label.sortname (test.input);
            QUnit.equals(result, test.expected, test.input);
        });

    });

};

MB.tests.GuessCase.Modes = function() {
    QUnit.module('Guess Case');
    QUnit.test('Artist', function() {

        tests = [
            {
                // FIXME: should be lowercase 'of' in expected?
                input: 'Members Of Mayday',
                expected: 'Members Of Mayday'
            },
            {
                input: 'the prodigy & tom morello',
                expected: 'The Prodigy & Tom Morello'
            },
            {   input: ' ',         expected: '[unknown]'  },
            {   input: 'n/a',       expected: '[unknown]'  },
            {   input: 'NONE',      expected: '[unknown]'  },
            {   input: 'unknown',   expected: '[unknown]'  },
            {   input: 'No Artist', expected: '[unknown]'  }
        ];

        $.each(tests, function(idx, test) {
            result = MB.GuessCase.artist.guess (test.input);
            QUnit.equals(result, test.expected, test.input);
        });

    });

    QUnit.test('Label', function() {

        tests = [
            {
                input: 'da! heard it records',
                expected: 'Da! Heard It Records'
            },
            {   input: ' ',         expected: '[unknown]'  },
            {   input: 'n/a',       expected: '[unknown]'  },
            {   input: 'NONE',      expected: '[unknown]'  },
            {   input: 'unknown',   expected: '[unknown]'  },
            {   input: 'No Label',  expected: '[unknown]'  }
        ];

        $.each(tests, function(idx, test) {
            result = MB.GuessCase.label.guess (test.input);
            QUnit.equals(result, test.expected, test.input);
        });

    });

    QUnit.test('Work', function() {

        tests = [
            {
                input: "WE LOVE TECHPARA VI",
                expected: "WE LOVE TECHPARA VI",
                mode: "English", roman: true, keepuppercase: true
            },
            {
                input: "WE LOVE TECHPARA VI",
                expected: "We Love Techpara VI",
                mode: "English", roman: true, keepuppercase: false
            },
            {
                input: "WE LOVE TECHPARA VI",
                expected: "We Love Techpara Vi",
                mode: "English", roman: false, keepuppercase: false
            },
            {
                input: "WE LOVE TECHPARA VI",
                expected: "We love techpara VI",
                mode: "Sentence", roman: true, keepuppercase: false
            },
            {
                input: "acte 1, no. 7: chœur: «voyons brigadier»",
                expected: "Acte 1, no. 7 : Chœur : « voyons brigadier »",
                mode: "French", roman: false, keepuppercase: false
            },
            {
                input: "Concerto d-Moll nach Antonio Vivaldi op 3 nr 11 bwv596: V. allergro",
                expected: "Concerto D-Moll nach antonio vivaldi, Op. 3, No. 11, BWV 596: V. Allegro",
                mode: "Classical", roman: true, keepuppercase: false
            }
        ];

        $.each(tests, function(idx, test) {
            /* input and expected don't exist as options and will be ignored. */
            MB.GuessCase.work.gc.setOptions (test);

            result = MB.GuessCase.work.guess (test.input);
            QUnit.equals(result, test.expected, test.input);
        });

    });
};


MB.tests.GuessCase.BugFixes = function() {
    QUnit.module('Guess Case');
    QUnit.test('BugFixes', function() {

        tests = [
            {
                input: "E Pra Sempre Te Amar: Ao Vivo",
                expected: "E pra sempre te amar: Ao vivo",
                bug: 'MBS-1311', mode: "Sentence",
            },
            {
                input: "Me Esqueça / No Limite / Desesperadamente Apaixonado",
                expected: "Me esqueça / No limite / Desesperadamente apaixonado",
                bug: 'MBS-1311', mode: "Sentence",
            },
            {
                input: "ハイタッチ (w/o maaya)",
                expected: "ハイタッチ (without Maaya)",
                bug: 'MBS-1312', mode: "English",
            },
            {

                input: "Megablast (Rap Version) (ft. Merlin)",
                expected: "Megablast (rap version) (feat. Merlin)",
                bug: 'MBS-1313', mode: "English",
            },
            {

                input: "너 (Techno Version)",
                expected: "너 (techno version)",
                bug: 'MBS-1313', mode: "English",
            }
        ];

        $.each(tests, function(idx, test) {
            /* input and expected don't exist as options and will be ignored. */
            MB.GuessCase.work.gc.setOptions (test);

            result = MB.GuessCase.work.guess (test.input);
            QUnit.equals(result, test.expected, test.bug + ', ' + test.input);
        });

    });
};

MB.tests.GuessCase.Run = function() {
    MB.tests.GuessCase.Sortname ();
    MB.tests.GuessCase.Modes ();
    MB.tests.GuessCase.BugFixes ();
};

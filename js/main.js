/**
 * File main.js.
 */

( function( $ ) {

    $( document ).ready( function() {

        var query = $('#query'),
            errorMessage = $('#error-message'),
            main = $('#main'),
            noJS = $('#no-js'),
            inventory = $('#inventory'),
            input = $('#input'),
            reload = $('#reload'),
            help = $('#help'),
            helpToggle = $('#help-toggle'),
            reset = $('#reset'),
            path = $('#path'),
            footer = $('#footer'),
            title = $('#title'),
            instruction = $('#instruction'),
            next = $('#next');

        var stage = 0,
            party = "",
            name = "",
            defected = false,
            rudeName = false,
            response = "",
            item = "",
            mugwump = false,
            dirtyNames = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "boooooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dicks", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
            intro = "<p>You see <a class=\"prefill\">Labour</a>, <a class=\"prefill\">Conservative</a>, <a class=\"prefill\">Liberal Democrats</a>, <a class=\"prefill\">Green</a>, <a class=\"prefill\">UKIP</a>, and the <a class=\"prefill\">SNP</a>. Who do you give your vote to?</p><p class=\"tip\"><strong>Tip:</strong> You can click the options to prefill the answer box.</p>";

        /**
         * Parties object contains data for parties plus stages with replies, answers, result
         * and gameover state.
         */
        var parties = {
            'labour' : {
                names: [ 'labour', 'labour party', 'jeremy', 'jeremy corbyn', 'corbyn', 'l', 'la', 'lab', 'labo', 'labou', '1' ],
                colour: '#e74c3c',
                item: 'school meal',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to <strong>Labour</strong>. As a voting incentive, you are given a free <strong><a href=\"http://www.bbc.co.uk/news/education-39504339\" class=\"ref\" target=\"blank\">school meal</a></strong>. Delicious!</p><p>In the visionary spirit of Jeremy Corbyn, you depart from the green and head towards the polling station by bike.</p>"
                            }
                        ]
                    },
                    {
                        question: "<p>As you cycle out of the village green, <strong>Theresa May</strong> ambushes you from a large broccoli-like tree. As she swings down, the sunlight catches her <a href=\"http://www.bbc.co.uk/news/uk-politics-38287637\" class=\"ref\" target=\"blank\">shiny trousers</a> and you're momentarily blinded.</p><p>&ldquo;We are the party of <a href=\"http://www.telegraph.co.uk/news/2017/04/26/pmqs-times-theresa-may-says-strong-stable/\" class=\"ref\" target=\"blank\">strong and stable leadership</a>,&rdquo; she says. &ldquo;It’s in the nation’s best interest to vote Conservative.&rdquo;</p><p>Do you <a class=\"prefill\">argue</a>, <a class=\"prefill\">run</a>, or <a class=\"prefill\">defect</a>?</p>",
                        replies: [
                            {
                                answers: [ 'argue', 'a', '1' ],
                                result: "<p>You start to <strong>argue</strong> that Mrs. May’s headstrong Brexit plan places the union in danger. &ldquo;I will not be participating in any <a href=\"http://www.bbc.co.uk/news/uk-politics-39633696\" class=\"ref\" target=\"blank\">television debates</a>!&rdquo; she exclaims, and runs off. You proceed along your way.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'run', 'b', '2' ],
                                result: "<p>You try to <strong>run</strong>, but the spots in front of your eyes obscure a gentleman on a Boris Bike, who collides with you. You never cast your vote, the Conservatives get re-elected via a majority, and they ruin the NHS, so you can't get treated. You die after waiting a week in A&amp;E with no water.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'defect', 'c', '3' ],
                                result: "<p>Convinced by her argument, you defect to the Conservatives. Besides, [insert compelling reason to switch to Tories here]. Newly liberated to Capitalist ideals, you discard your &ldquo;<a href=\"https://www.thetimes.co.uk/article/marr-is-snubbed-for-a-day-at-church-9ds5783n35h\" class=\"ref\" target=\"blank\">Chairman Mao</a>&rdquo; bicycle and pick up the phone to hire a Limo for the rest of the journey.</p>",
                                defect: 'conservative',
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'school meal', 'use school meal' ],
                                result: "<p>You throw the <strong>school meal</strong> at Mrs. May, which splatters all down her shiny trousers and leaves her visibly upset. A passing youth films the encounter on his smartphone and the footage goes viral as fodder to state that women are &ldquo;too emotional to lead.&rdquo;</p><p>You continue on your way.</p>",
                                itemRequired: 'school meal',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>As you strut along, <strong>Nicola Sturgeon</strong> emerges from the grove, uproots a tree and tosses it like a caber, blocking your path. \"You'll need me on your side to help you move this tree,\" she claims.</p><p>Do you attempt to <a class=\"prefill\">lift</a> it yourself, form a <a class=\"prefill\">coalition</a> to lift the tree, or <a class=\"prefill\">employ</a> some nearby workers to help?</p>",
                        replies: [
                            {
                                answers: [ 'lift', 'a', '1' ],
                                result: "<p>You stubbornly attempt to <strong>lift</strong> the tree yourself. \"No coalitions, no tie-ins, no deals!\" you cry.</p><p>You unsurprisingly put your back out within seconds. You're too unwell to cast your vote, the Conservatives get re-elected via a majority, and they ruin the NHS. You're given a dodgy chiropractor whose incompetence leaves you permanently disabled.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'coalition', 'b', '2' ],
                                result: "<p>In order to get past the tree, you form a <strong>coalition</strong> with Mrs. Sturgeon. You're not sure if she has your best interests at heart, but you go ahead anyway and with her help you clear the path. On you go towards the polling station.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'employ', 'c', '3' ],
                                result: "<p>You decide to <strong>employ</strong> some nearby workers to help. They're idle anyway, as they're on exploitative zero-hours contracts.</p><p>Unfortunately you can't afford them, so you phone up the bank and ask for a loan. Once it's approved you pay the workers, they move the tree and you continue to the polling station.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'money', 'use money' ],
                                result: "<p>You use the money.</p>",
                                itemRequired: 'money',
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'school meal', 'use school meal' ],
                                result: "<p>You use the school meal.</p>",
                                itemRequired: 'school meal',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. Jeremy Corbyn welcomes you inside as &ldquo;Comrade&rdquo;, and introduces you to your local Labour candidate.</p><p>After a few words you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with Labour?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Like a <a href=\"http://www.bbc.co.uk/news/uk-36632956\" class=\"ref\" target=\"blank\">Labour frontbencher</a>, you backstab your party and <strong>leave</strong> for your constituency's Independent candidate at the last moment. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                defect: 'independent',
                                gameover: false
                            },
                            {
                                answers: [ 'remain', 'b', '2' ],
                                result: "<p>You close your eyes, think of the NHS, and <strong>remain</strong> true to Labour. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'school meal', 'use school meal' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station. You sit on the polling station steps and eat your bland <strong>school meal</strong>.</p><p>You never cast your vote, the Conservatives get re-elected via a landslide majority, and they enact a hard Brexit. The school meal gives you food poisoning.</p>",
                                itemRequired: 'school meal',
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'money', 'use money' ],
                                result: "<p>You use the item.</p>",
                                itemRequired: 'money',
                                gameover: false
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>Labour are elected via a majority. Your one vote made the difference!</li><li>All the rich people flee to Switzerland, ruining the economy as banks and companies move abroad, leaving Britain with a GDP similar to Tuvalu.</li><li>Labour renege on their \"No deals\" approach to get Mr. Miliband in power. Scotland hold the government to ransom, cry \"Freedom!\" and Hadrian's Wall is rebuilt. Labour defend this as a fulfillment of their promise to give all hard-working Britons \"good jobs\".</li><li>The Tories are re-elected in 2020 and complain once again about the mess they inherited.</li></ul>"
            },
            'conservative' : {
                names: [ 'conservative', 'conservatives', 'conservative party', 'tory', 'tories', 'theresa may', 'teresa may', 'may', 'c', 'con', 'cons', 'conse', 'conser', 'conserv', 'conserva', 'conservat', 'conservati', '2' ],
                colour: '#3498db',
                item: 'money',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to the <strong>Conservatives</strong>. As a voting incentive, you are given some <strong>money</strong>. Cha-ching!</p><p>You ring your driver Sebastien to ask him to bring the Rolls round, as you'll be heading to the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>As you wait for Sebastien to appear, <strong>Nigel Farage</strong> saunters out of The Dog &amp; Duck with a pint. He spots your Tory rosette and walks over. \"I see you're voting Conservative,\" he says. \"Why not go all the way to the right?\"</p><p>Do you <a class=\"prefill\">ignore</a>, <a class=\"prefill\">run</a>, or <a class=\"prefill\">defect</a>?</p>",
                        replies: [
                            {
                                answers: [ 'ignore', 'a', '1' ],
                                result: "<p>You choose to <strong>ignore</strong> Mr. Farage. Besides, Sebastien is a migrant (it's actually Sébastien) and you rather like him. Frustrated at getting no response, Mr. Farage moves away to a pair of smokers sitting outside the pub. At that moment, the Rolls pulls up.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'run', 'b', '2' ],
                                result: "<p>You choose to <strong>run</strong>. In your desperation to get away, you run into the road, only for Sebastien to arrive at that very moment, hitting you with your own Rolls Royce. As you lay dying, the irony is not lost on you.</p><p>You never cast your vote, Labour gets elected via a majority, and they introduce the mansion tax so your family sells the estate to pay for your funeral.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'defect', 'c', '3' ],
                                result: "<p>You decide to <strong>defect</strong>. After all, you never really liked your migrant driver Sebastien (his name is actually Sébastien). You call off the car and instead ring Keith, who built your conservatory. He picks you up in his white Transit van, and you both head to the polling station, via the car wash.</p>",
                                gameover: false,
                                defect: 'ukip'
                            }
                        ]
                    },
                    {
                        question: "<p>You climb in the Rolls, only to find <strong>Ed Miliband</strong> sitting on the back seat next to you. \"Where will you find the extra £8 billion you've pledged to the NHS?\" he demands.</p><p>Do you <a class=\"prefill\">duck</a> the question, go on the <a class=\"prefill\">attack</a>, or <a class=\"prefill\">push</a> Mr. Miliband out of the moving car?</p>",
                        replies: [
                            {
                                answers: [ 'duck', 'duck the question', 'a', '1' ],
                                result: "<p>You choose to <strong>duck</strong> the question. \"It's part of our balanced plan,\" you try to say. Before Mr. Miliband can grill you further the car runs into some traffic, and you flee the scene on foot.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'attack', 'go on the attack', 'b', '2' ],
                                result: "<p>You go on the <strong>attack</strong>. \"The NHS should be privatised anyway,\" you say. You fail to realise that your window is open, and you are passing the local hospital.</p><p>With a satisfied glow, Mr. Miliband leans across and opens your door. You wheel round in horror as a herd of angry doctors and nurses charge at you, wielding syringes and scalpels. Mr. Miliband awkwardly smiles as they take you away.</p><p>You never cast your vote, Labour gets elected via a majority, and they introduce the mansion tax so your family sells the estate to pay for your funeral.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'push', 'push mr miliband', 'push mr. miliband', 'c', '3' ],
                                result: "<p>You <strong>push</strong> Mr. Miliband out of the moving car. As he hits the tarmac, you wonder whether you could have used a more diplomatic response. You're relieved to see him get up, brush himself off, and head into Greggs.</p>",
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. <strong>Theresa May</strong> is stood there awkwardly by herself. You ignore her too and go chat to your local Conservative candidate.</p><p>After a few words you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with the Conservatives?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Just like <a href=\"http://www.bbc.co.uk/news/uk-politics-36672591\" class=\"ref\" target=\"blank\">Michael Gove’s cold knife</a> into the back of Boris &lsquo;Julius&rsquo; Johnson, you betray your party and <strong>leave</strong> for your constituency's Independent candidate. Your vote hits the bottom of the ballot box. Outside you hear a cockerel crow. Congratulations, you successfully voted!</p>",
                                defect: 'independent',
                                gameover: false
                            },
                            {
                                answers: [ 'remain', 'b', '2' ],
                                result: "<p>You close your eyes, think of the economy, and <strong>remain</strong> true to the Conservatives. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'money', 'use money' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station. You go to the newsagents and spend your <strong>money</strong> on thousands of penny sweets.</p><p>You never cast your vote, Labour gets elected via a majority, and ends private ownership of pets. Eating all the sweets makes you unwell, but as Labour have added four new bank holidays, the hospital is closed. You die of a stomach impaction.</p>",
                                itemRequired: 'money',
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'school meal', 'use school meal' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station. You sit on the polling station steps and eat your bland <strong>school meal</strong>.</p><p>You never cast your vote, Labour gets elected via a majority, and ends private ownership of pets. The school meal makes you feel unwell, but as Labour have added four new bank holidays, the hospital is closed. You die of food poisoning.</p>",
                                itemRequired: 'school meal',
                                gameover: true
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>The Conservatives are elected via a majority. Your vote was a mere droplet in an unstoppable tide of blue.</li><li>With her new five-fold majority government, Theresa May assumes a mandate for a full Brexit, walling off the Eurotunnel and deploying gunboats off the coast. The first victim is national treasure David Walliams on a charity swim.</li><li>Upon hearing that Piers Morgan is slated to fill his seat on Britain’s Got Talent, the proletariat gather and raze the City, Parliament and all of Maidenhead.</li><li>The Green party are elected in 2020 and ban the Grand National, meat, and the Queen.</li></ul>"
            },
            'libdem' : {
                names: [ 'libdem', 'liberal democrat', 'liberal democrats', 'lib dem', 'lib dems', 'tim farron', 'tim', 'farron', 'lib', 'li', 'libd', 'lib d', '3' ],
                colour: '#FAA61A',
                item: 'straight banana',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to the <strong>Liberal Democrats</strong>. As a voting incentive, you are given a <strong>straight banana</strong>. Best appreciate it; in a few years these will be more rare and valuable than those <a href=\"http://www.bbc.co.uk/news/uk-scotland-south-scotland-38223552\" class=\"ref\" target=\"blank\">£5 notes</a>.</p><p>You start towards the car park, as you'll be heading to the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>You enter the car park only to see <strong>Boris Johnson</strong> applying a Union Jack sticker over the EU badge on your numberplate.</p><p>Do you <a class=\"prefill\">confront</a>, <a class=\"prefill\">attack</a>, or <a class=\"prefill\">wait</a> until he’s gone to peel the sticker off?</p>",
                        replies: [
                            {
                                answers: [ 'confront', 'a', '1' ],
                                result: "<p>You choose to <strong>confront</strong> Mr. Johnson, berating him for his immaturity. He begins to reply, but sees your Liberal Democrat tote-bag and is suddenly reminded to call his <a href=\"https://www.channel4.com/news/rachel-johnson-joins-liberal-democrats-block-brexit\" class=\"ref\" target=\"blank\">sister</a>. You remove the sticker and continue on your way.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'attack', 'b', '2' ],
                                result: "<p>You choose to <strong>attack</strong> Mr. Johnson, flailing your Liberal Democrat tote-bag like a mace. He takes the first few hits, but the sharp corners of your <a href=\"https://t.co/vofRyLeegV\" class=\"ref\" target=\"blank\">diamond placard</a> start doing some real damage. He retreats, spewing archaic insults. You remove the sticker and continue on your way.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'wait', 'c', '3' ],
                                result: "<p>You wait until Mr. Johnson has left the scene and lean down to peel the sticker off. Unfortunately it’s one of those stickers that peels off rather unsatisfyingly and it takes you hours to remove, leaving a grubby residue.</p><p>By the time you make it to the polling station it’s closed so you never cast your vote. The Conservatives are elected via a landslide majority, enact a hard Brexit, and Mr. Johnson uses NHS money to commission a <a href=\"http://www.independent.co.uk/news/uk/politics/royal-yacht-britannia-monarchy-boris-johnson-republic-money-a7628416.html\" class=\"ref\" target=\"blank\">Royal Yacht</a>, thinking it will make trade deals easier with the &ldquo;<a href=\"http://www.telegraph.co.uk/comment/personal-view/3571742/If-Blairs-so-good-at-running-the-Congo-let-him-stay-there.html\" class=\"ref\" target=\"blank\">piccaninnies</a>.&rdquo;</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'straight banana', 'use straight banana', 'use banana', 'banana' ],
                                result: "<p>You eat the <strong>straight banana</strong> and discreetly place the peel behind Mr. Johnson. He steps back—and obviously doesn’t slip because this isn’t <em>Mario Kart</em>, and bananas really aren’t that slippery. However his general oafishness causes him to trip over anyway. You remove the sticker and go on your way.</p>",
                                itemRequired: 'straight banana',
                                gameover: false
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>The Liberal Democrats are elected via a majority. Your one vote made the difference!</li><li>As his first move in power, Mr. Clegg railroads a bill for proportional representation, which backfires when polls show the Monster Raving Loony Party held a silent majority.</li><li>As part of their fairness agenda, the Lib Dems open up the House of Lords and national treasure James Corden becomes the first elected member.</li><li>Danny Alexander bets the country's whole pension budget on a horse in the Grand National, and loses. The economy collapses and the unfortunate horse, who literally fell at the last hurdle, is put down.</li></ul>"
            },
            'ukip' : {
                names: [ 'ukip', 'united kingdom independence party', 'uk independence party', 'racists', 'uk', 'uki', '4' ],
                colour: '#8e44ad',
                item: 'lotto scratchcard',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to the <strong>United Kingdom Independence Party</strong>. As a voting incentive, you are given a <strong>Lotto scratchcard</strong>. Will today be your lucky day?</p><p>You start towards the car park where you left your white Transit van, as you'll be heading to the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>You enter the car park only to see <strong>Tim Farron</strong> replacing the St. George’s Cross window flags on your Transit van with that of the European Union.</p><p>Do you <a class=\"prefill\">confront</a>, <a class=\"prefill\">attack</a> alone, or <a class=\"prefill\">wait</a> for the lads to arrive?</p>",
                        replies: [
                            {
                                answers: [ 'confront', 'a', '1' ],
                                result: "<p>You choose to <strong>confront</strong> Mr. Farron. &ldquo;Typical Remoaner!&rdquo; you cry. You remove the flags and attempt to burn them, but due to EU regulations on fire prevention, <a href=\"https://www.youtube.com/watch?v=TQRg7wH_FC0\" class=\"ref\" target=\"blank\">they don’t catch</a>.</p><p>Doesn’t matter anyway, you still won the referendum. Soon you’ll be able to burn any flag you like. You hop in the van and pull out of the car park.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'attack', 'b', '2' ],
                                result: "<p>You choose to <strong>attack</strong> Mr. Farron by yourself. However as you raise your proud British fist to strike him, your wrist is grabbed from behind. It’s <strong>Nigel Farage.</strong></p><p>&ldquo;Calm down my friend, it’s not the British way. Where’s your stiff upper lip?&rdquo;</p><p>Since it’s coming from Mr. Farage, you can see the logic. You walk past Mr. Farron and hop in the van.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'wait', 'c', '3' ],
                                result: "<p>You <strong>wait</strong> for the lads to arrive and approach Mr. Farron. However, <a href=\"http://www.bbc.co.uk/news/election-2015-32601281\" class=\"ref\" target=\"blank\">just like in the last election</a>, your high numbers don’t seem to count for much and he easily overpowers you and your gang. As he takes off in your transit van, you concede he made a strong opposition.</p><p>You never cast your vote, the Liberal Democrats get elected via a majority, keep the UK in Europe and the foreman hires a Pole in the position your hospitalisation left vacant.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'lotto scratchcard', 'use lotto scratchcard', 'use scratchcard', 'scratchcard' ],
                                result: "<p>While Mr. Farron has his back turned, you place the <strong>lotto scratchcard</strong> on the ground, hoping his <a href=\"https://en.wikipedia.org/wiki/Libertarianism\" class=\"ref\" target=\"blank\">Libertarian stance</a> of individuals having the ethical right to the product of their own labour will convict him to repatriate the scratchcard to its rightful owner.</p><p>Your plan works flawlessly as he picks it up and starts to approach passers-by one-by-one. You hop in your van and head towards the polling station.</p>",
                                itemRequired: 'lotto scratchcard',
                                gameover: false
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>UKIP are elected via a majority. Your one vote made the difference!</li><li>All EU migrants are chucked out of Britain, bringing various workforces (most notably the NHS) to a standstill, leading to thousands of easily treatable deaths, including that of Mr. Farage after he drinks too many pints, gets cirrhosis and dies.</li><li>The nation descends into anarchy as all UKIP candidates up for replacing him talk disparagingly about 'darkies' in their manifestos, leading to riots in Birmingham, Bradford, London and Leicester. The UKIP cabinet move the capital of the UK to Clacton-on-Sea for safety, but an angry mob of Essex scum raze the new capital in a rage, thinking 'darkie' refers to them after a quick session on a sunbed.</li></ul>"
            },
            'green' : {
                names: [ 'green', 'green party', 'greens', 'g', 'gr', 'gre', 'gree', '5' ],
                colour: '#2ecc71',
                item: 'organic courgette',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to the <strong>Green</strong> party. As a voting incentive, you’re given an <strong>organic courgette</strong>. Just need some tofu now and that’s Friday’s dinner party sorted.</p><p>You start towards the car park where you left your Nissan Leaf, as you'll be heading to the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>You enter the car park to find your Nissan Leaf on bricks. You’ve always regretted trading your bicycle in, but that’s <a href=\"https://www.thetimes.co.uk/article/marr-is-snubbed-for-a-day-at-church-9ds5783n35h\" class=\"ref\" target=\"blank\">Corbyn’s thing</a> now.</p><p>Nearby, <strong>Paul Nuttall</strong> is addressing a crowd. The raised platform he’s standing on is clearly propped up on your wheels.</p><p>Do you <a class=\"prefill\">attack</a> him, call upon your <a class=\"prefill\">woodland friends</a>, or <a class=\"prefill\">reprimand</a> Mr. Nuttall?</p>",
                        replies: [
                            {
                                answers: [ 'attack', 'a', '1' ],
                                result: "<p>You approach Mr. Nuttall to <strong>attack</strong> him. You swing your fist with the goal of knocking him unconscious. However your vegan diet has severely weakened your muscles and he barely even acknowledges the contact.</p><p>Footage of the incident is shared among alt-right news sites with the title “BRAVE speech TRIGGERS SJW to VIOLENT ATTACK!” By the time you get your wheels back, it’s too late to vote. The Conservatives get re-elected via a majority, your boss fires you, and you can’t find any food at the food bank without meat in it.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'woodland friends', 'b', '2' ],
                                result: "<p>You call upon your <strong>woodland friends</strong> for aid. A troop consisting of hedgehogs, squirrels, foxes and other sylvan critters emerges from the thicket and lifts the platform, freeing your wheels and knocking Mr. Nuttall to the ground. A majestic stag carries Mr. Nuttall away on his antlers. His screams ring in the distance.</p><p>A friendly badger reattaches your wheels, and you give him a generous tip for being so expeditious. You continue on your way.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'reprimand', 'c', '3' ],
                                result: "<p>You <strong>reprimand</strong> Mr. Nuttall for stealing your wheels. In return he berates you for &ldquo;verbally assaulting&rdquo; a &ldquo;<a href=\"https://en.wikipedia.org/wiki/Paul_Nuttall#Hillsborough_claims\" class=\"ref\" target=\"blank\">Hillsborough survivor.</a>&rdquo; This understandably upsets a nearby crowd of Liverpool supporters who know the names and addresses of everyone present at Hillsborough. While Mr. Nuttall is mobbed by the crowd, you retrieve your wheels and continue on your way.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'organic courgette', 'use organic courgette', 'use courgette', 'courgette' ],
                                result: "<p>You offer your <strong>organic courgette</strong> to Mr. Nuttall, explaining that it could make a sturdy replacement as a prop for the stage due to its excellent genetics. He looks blankly at it, suggesting this might be the first marrow he’s ever seen, but after a while he sees his own reflection in it and agrees to make the trade. You reattach your wheels and continue on your way.</p>",
                                itemRequired: 'organic courgette',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You take a shortcut through a council estate, where you spot <strong>Theresa May</strong> being shown around a community centre. She begins a speech where she extols the need for <a href=\"http://www.telegraph.co.uk/news/2017/04/26/pmqs-times-theresa-may-says-strong-stable/\" class=\"ref\" target=\"blank\">strong and stable leadership</a>. You also notice a group of unemployed youths nearby smoking cannabis.</p><p>Do you <a class=\"prefill\">heckle</a> Mrs. May, get help from the <a class=\"prefill\">youths</a>, or <a class=\"prefill\">ignore</a> the situation?</p>",
                        replies: [
                            {
                                answers: [ 'heckle', 'a', '1' ],
                                result: "<p>You <strong>heckle</strong> Mrs. May. However the words you say don't incite the uprising you hoped for, as the crowd's energy is sapped from having to use food banks. You sheepishly back away from the encounter, embarrassed but unscathed.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'youths', 'b', '2' ],
                                result: "<p>You walk over to the <strong>youths</strong>. You soon forget your plan however as the second-hand smoke brings you back to your &lsquo;exploration phase&rsquo; at Leeds University. You decide instead to get high with the youths.</p><p>You never cast your vote, the Conservatives get re-elected via a majority, and dodgy gas companies start fracking under your home.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'ignore', 'c', '3' ],
                                result: "<p>You choose to simply <strong>ignore</strong> the situation, remembering you have goji berries at home and would rather get there as soon as possible. But first via the polling station.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'organic courgette', 'use organic courgette', 'use courgette', 'courgette' ],
                                result: "<p>You run to the pedestal and belt out &ldquo;<em>Naaaaants</em> ingon<em>yaaa</em>ma bagithi <em>Baba!</em>&rdquo; holding the <strong>organic courgette</strong> aloft like Rafiki holding Simba in <em>The Lion King.</em></p><p>The crowd is stunned. Mrs. May is paralysed into a stupor. You looked like a bit of a wally, but who’s going to remember what Mrs. May was saying now? You retire the courgette, having fulfilled its greater purpose.</p><p>You get back in the car feeling smug and head to the polling station.</p>",
                                itemRequired: 'organic courgette',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. <strong>Caroline Lucas</strong> and <strong>Jonathan Bartley</strong> are there outside to greet you and introduce you to your local Green party candidate.</p><p>After a few words you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with the Greens?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Like a wind turbine killing an endangered falcon, you betray your ideals and <strong>leave</strong> for your constituency's Independent candidate at the last moment. Your vote hits the bottom of the ballot box. Outside you hear a cockerel crow. Congratulations, you successfully voted!</p>",
                                defect: 'independent',
                                gameover: false
                            },
                            {
                                answers: [ 'remain', 'b', '2' ],
                                result: "<p>You close your eyes, think of the environment, and <strong>remain</strong> true to the Green party. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'organic courgette', 'use organic courgette', 'use courgette', 'courgette' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station, where you hand the <strong>organic courgette</strong> to a homeless man along with a recipe you found on <em>Pinterest</em>.</p><p>You never cast your vote, the Conservatives get re-elected via a landslide majority, and dodgy gas companies start fracking under your home.</p>",
                                itemRequired: 'organic courgette',
                                gameover: true
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>The Green party are elected via a majority. Your one vote made the difference!</li><li>Anarchy proceeds as the Greens ban meat consumption (leading to several well-publicised deaths of people with anaemia), cars, fire and killing any animals, even the ones with diseases.</li><li>Rabies and plague epidemics become widespread, not helped by the huge increase in funding for homeopathic treatments.</li><li>Everyone dies before they can flee abroad to escape 90% tax rates for anyone earning over £30k a year.</li></ul>"
            },
            'snp' : {
                names: [ 'snp', 'the snp', 'scottish national party', 'nicola sturgeon', 'nicola', 'sturgeon', 's', 'sn', '6' ],
                colour: '#f1c40f',
                item: 'scissors',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to the Scottish National Party. As a voting incentive, you are given a fetching tartan-patterned pair of <strong>scissors</strong>.</p><p>With spirit and determination, you set out across the Highlands towards the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>As you crest the braigh, you run into <strong>Theresa May</strong> in <a href=\"https://www.theguardian.com/politics/2016/aug/12/theresa-may-seeks-peace-and-quiet-on-alpine-walking-holiday\" class=\"ref\" target=\"_blank\">full hiking equipment</a>, gale force winds whipping her hair around. &ldquo;A fine country,&rdquo; she shouts. Aye.</p><p>She continues, &ldquo;&mdash;but greater as part of a United Kingdom under my <a href=\"http://www.telegraph.co.uk/news/2017/04/26/pmqs-times-theresa-may-says-strong-stable/\" class=\"ref\" target=\"_blank\">strong and stable leadership</a>.&rdquo;</p><p>Do you <a class=\"prefill\">ignore</a>, <a class=\"prefill\">attack</a>, or <a class=\"prefill\">cry freedom</a>?</p>",
                        replies: [
                            {
                                answers: [ 'ignore', 'a', '1' ],
                                result: "<p></p>",
                                gameover: true
                            },
                            {
                                answers: [ 'attack', 'b', '2' ],
                                result: "<p>You <strong>attack</strong> Mrs. May, unsheathing your claymore and hewing her hiking poles in twain. Suddenly imbalanced, she falls backwards and rolls down the side of the torr.</p><p>You quote <a href=\"http://www.imdb.com/title/tt0112573/quotes?item=qt0440126\" class=\"ref\" target=\"_blank\">William Wallace</a>: “Every man dies, not every man really lives.”</p><p>Indeed.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'cry freedom', 'c', '3', 'freedom' ],
                                result: "<p></p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'scissors', 'use scissors', 'use pair of scissors', 'pair of scissors' ],
                                result: "<p></p>",
                                itemRequired: 'scissors',
                                gameover: false
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>The Green party are elected via a majority. Your one vote made the difference!</li><li>Anarchy proceeds as the Greens ban meat consumption (leading to several well-publicised deaths of people with anaemia), cars, fire and killing any animals, even the ones with diseases.</li><li>Rabies and plague epidemics become widespread, not helped by the huge increase in funding for homeopathic treatments.</li><li>Everyone dies before they can flee abroad to escape 90% tax rates for anyone earning over £30k a year.</li></ul>"
            },
            'independent' : {
                names: [],
                colour: '#34495e',
                endresult: "<ul><li>Your Independent candidate is elected. Your one vote made the difference!</li><li>No one party achieves a majority in the Election. Unable to form a parliament, the Queen offers your new MP the job of Prime Minister, which he accepts.</li><li>After enacting some questionable policies (such as solar roadways, outlawing Ska music, and employing the Banker from <em>Deal Or No Deal</em> as the Chancellor), he finally finds his feet, becoming the most beloved Prime Minister since Churchill.</li><li>After 7 consecutive terms, he draws his last breath and dies in office. A gold statue to commemorate him is built in place of the London Eye.</li></ul>"
            }
        }

        /**
         * Turn autocomplete off on input
         */
        input.attr( 'autocomplete', 'off' );

        /**
         * Hide #no-js box
         */
        noJS.hide();

        /**
         * Add event listener to input detecting 'Return' keypress and calling updateResponse() function
         */
        input.on( 'keypress', function ( e ) {
            var key = e.which || e.keyCode,
                val = $( this ).val();

            if ( key === 13 ) {
                updateResponse();
            }
        });

        /**
         * Turn autocomplete off on input
         */
        main.on( 'click', 'a.prefill', function( e ) {
            e.preventDefault();

            if ( $( this ).data( 'prefill' ) ) {
                var text = $( this ).data( 'prefill' );
            } else {
                var text = $( this ).text();
            }

            input.attr( 'placeholder', '' ).val( text ).focus();
        } );

        /**
         * Turn autocomplete off on input
         */
        main.on( {
            mouseenter: function () {
                //stuff to do on mouse enter
                if ( $( this ).data( 'prefill' ) ) {
                    var text = $( this ).data( 'prefill' );
                } else {
                    var text = $( this ).text();
                }

                input.attr( 'placeholder', text );
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                input.attr( 'placeholder', '' );
            }
        }, 'a.prefill' );

        /**
         * Add event listener to next button and calling updateResponse() function
         */
        next.on( 'click', function( e ) {
            e.preventDefault();

            updateResponse();
        } );

        helpToggle.on( 'click', function( e ) {
            e.preventDefault();

            help.fadeToggle( 200 );
        } );

        function nextButton() {
            input.hide();
            next.focus();
            reload.hide();
        }

        function userInput() {
            input.show();
            input.focus();
            reload.hide();
        }

        function retryButton() {
            input.hide();
            next.hide();
            reset.hide();
            reload.show();
            reload.focus();
        }

        function renderInventory( newItem = false ) {
            if ( newItem ) {
                // Set new item
                item = newItem;

                query.append( '<p><img src="imgs/bag.png" class="bag" /> Item added: <span class="item">' + item + '</span></p>' );
            } else {
                // If item exists, show inventory
                if ( item ) {
                    inventory.html( '<p><img src="imgs/bag.png" class="bag" /> You have: <a class="prefill" data-prefill="use ' + item + '"><span class="item">' + item + '</span></a></p>' );
                } else {
                    inventory.html( '' );
                }
            }
        }

        function spoilBallot( rejectedResponse ) {
            query.html( "<p class=\"text-center\">Oh look, you've spoiled your ballot, you anarchist!</p>" );

            if ( rejectedResponse ) {
                query.append( "<p class=\"text-center\">You might have made a typo. You typed: <strong>&ldquo;" + rejectedResponse + "&rdquo;</strong></p>" );
            } else {
                query.append( "<p class=\"text-center\">It looks like you didn't type an answer. Maybe you're one of the silent majority?</p>" );
            }

            gameOver();
        }

        function gameOver() {
            item = '';

            renderInventory();

            query.append( "<h1>GAME OVER</h1>" );

            retryButton();
        }

        $.sanitize = function(input) {
        	var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
        				 replace(/<[\/\!]*?[^<>]*?>/gi, '').
        				 replace(/<style[^>]*?>.*?<\/style>/gi, '').
        				 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
            return output;
        };

        /**
         * updateResponse() function, called every time stage progresses
         */
        function updateResponse() {

            // Get input value
            response = $.sanitize( input.val().toLowerCase() );

            if ( stage === 0 ) {

                title.addClass( 'title-reduced' );

                // Define user name
                if ( response === "" || !/\S/.test( response ) ) {
                    name = "Anonymous Voter";
                } else {
                    name = response;
                }

                query.html( '<p>While you\'re walking through your constituency, you spy a crowd of dishevelled political activists behind trestle tables in the village green. It looks like they’ve been standing there since the last election.</p>' );

                // Check if user has a rude name
                if ( $.inArray( name, dirtyNames ) !== -1 ) {
                    rudeName = true;

                    // Thank user
                    query.prepend( "<p>Well that's original. Fine, if you want to be called <span class=\"name\"><strong>" + name + "</strong></span> then that's your perogative.</p>" );
                    query.append( "<p>&ldquo;<span class=\"name\"><strong>" + name + "!</strong></span> <span class=\"name\"><strong>" + name + "!</strong></span>&rdquo; they cry.</p>" );
                } else {

                    // Special name states
                    if ( name.toLowerCase() === 'mugwump' ) {
                        // If name is 'Mugwump', inititate mugwump game state
                        mugwump = true;

                        // Change the title to something more Boris
                        title.html( 'Plump For One\'s Own Stirring Romp' );
                    } else if ( name.toLowerCase() === 'ed balls' ) {
                        // Ed Balls
                        alert( 'Ed Balls' );

                        // Ed Balls
                        title.html( '<a href=\"https://twitter.com/edballs/status/63623585020915713\" class=\"ref\" target=\"blank\">Ed Balls</a>' );
                    }

                    // Thank user
                    query.prepend( "<p>Thank you, <span class=\"name\"><strong>" + name + "</strong></span>.</p>" );
                }


                // Display next button
                nextButton();

                // Hide footer
                footer.hide();

            } else if (stage === 1) {

                // Show starting text
                query.html( intro );

                // Hide placeholder
                input.attr( 'placeholder', '' );

                // Show input field for user input
                userInput();

            } else if (stage === 2) {

                // Deny racists
                if ( response === 'bnp' ) {
                    errorMessage.html( '<p>Please choose a less racist and more relevant party.</p>' ).show( 100 );

                    return;
                }

                // Take response and check if it corresponds to a party
                $.each( parties, function( k, v ) {
                    if ( $.inArray( response, v.names ) !== -1 ) {
                        party = k;

                        return;
                    }
                } );

                // If no result, game over otherwise continue
                if ( party === '' ) {
                    // Game over man, game over
                    spoilBallot( response );
                } else {
                    // Why would a Mugwump choose any other party than the Tories, let's not let that happen
                    if ( mugwump && party !== 'conservative' ) {
                        errorMessage.html( '<p>Boris\' voice echoed: <em>&ldquo;Don\'t be a feeble-minded old fopdoodle, there\'s only one choice and it\'s the Tories!&rdquo;</em></p>' ).show( 100 );

                        // Reset the party, important
                        party = '';

                        return;
                    }

                    // Show party result
                    query.html( parties[party].stages[0].replies[0].result );

                    // Grant user item and render inventory
                    renderInventory( parties[party].item );

                    // Display next button
                    nextButton();
                }

            } else if ( stage === 3 || stage === 5 || stage === 7 ) {

                /**
                 * These are question stages demanding a user input
                 */

                // Find the question corresponding to user status
                query.html( parties[party].stages[(stage - 1) / 2].question );

                // Render inventory
                renderInventory();

                if ( stage === 3 ) {
                    query.append( '<p class=\"tip\"><strong>Tip:</strong> Don\'t like the options? You could use your item.</p> ');
                }

                // Show input field for user input
                userInput();

            } else if (stage === 4 || stage === 6 || stage === 8) {

                /**
                 * These are result stages following a user input
                 */

                // Create temporary state variable which stores answer key or null
                var state,
                    error,
                    replies = [],
                    reply;

                // Run through replies for this stage to see if one matches
                $.each( parties[party].stages[(stage - 2) / 2].replies, function( k, v ) {

                    // If there's a match, set state and add to replies array
                    if ( $.inArray( response, v.answers ) !== -1 ) {
                        state = k;

                        replies.push( v );

                        return;
                    }
                } );

                // If no state, end game
                if ( state == null ) {
                    // Game over
                    spoilBallot( response );
                } else {
                    // If more than one potential reply, search through replies to see if item matches itemRequired of a reply, and if so set reply variable
                    if ( replies.length > 1 ) {
                        $.each( replies, function( k, v ) {
                            if ( item === v.itemRequired ) {
                                reply = v;
                            }
                        } );
                    }

                    // Set reply to first in replies array if reply not already set
                    if ( reply == null ) {
                        reply = replies[0];
                    }

                    // Search reply for itemRequired
                    if ( reply.itemRequired ) {
                        // If item does not match itemRequired, show error message and return
                        if ( item !== reply.itemRequired ) {
                            errorMessage.html( '<p>You do not have the required item.</p>' ).show( 100 );

                            return;
                        } else {
                            // Spend the item
                            item = '';
                        }
                    }

                    // If defect state, we give defected variable a value, otherwise remains undefined
                    defected = parties[party].stages[(stage - 2) / 2].replies[state].defect;

                    // Mugwumps can't defect, that would be mutton-headed
                    if ( mugwump && defected ) {
                        errorMessage.html( '<p>Boris\' voice echoed: <em>&ldquo;Don\'t be a feeble-minded old fopdoodle, there\'s only one choice and it\'s the Tories!&rdquo;</em></p>' ).show( 100 );

                        defected = false;

                        return;
                    }

                    // Show result
                    query.html( reply.result );

                    // Render inventory
                    renderInventory();

                    // If gameover state, end game or continue
                    if ( parties[party].stages[(stage - 2) / 2].replies[state].gameover ) {
                        // Game over
                        gameOver();
                    } else {
                        // If defect state, change party
                        if ( defected ) {
                            party = defected;
                        }
                        // Show next button
                        nextButton();
                    }
                }

            } else if (stage === 9) {
                query.html( '<p><h3>End Result:</h3></p>' );

                // Append party's end result
                query.append( parties[party].endresult );

                // Remove items and render inventory
                item = '';

                renderInventory();

                // Show retry button
                retryButton();

                // Show footer
                footer.show();
            };

            // If party defined, change colour of elements
            if ( party ) {
                path.css( 'backgroundColor', parties[party].colour );
                next.css( 'backgroundColor', parties[party].colour );
            }

            // If defected to other party, prepend defected message
            if ( defected ) {
                query.prepend( '<p class="defected">Defected</p>' );

                $( '.defected' ).html( function( i, html ) {
                    return html.replace( /(.)/g, '<span class="letter">$1</span>' );
                } );

                $( '.letter' ).each( function() {
                    $( this ).delay( 2000 ).animate( {
                        opacity: 0,
                        left: "+=" + ( Math.ceil(Math.random() * 10) - 5 ),
                        top: "+=" + ( Math.ceil(Math.random() * 20) - 10 ),
                        letterSpacing: "0.1em"
                    }, {
                        duration: 2000,
                        easing: "easeOutCubic"
                    } );
                } );

                defected = false;
            } else {
                $( '.defected' ).hide();
            }

            // Empty input
            input.val('');

            // Increment stage
            stage++;

            // Hide error messages
            errorMessage.html( '' ).hide();

            // Scroll window to top
            $(window).scrollTop(0);

            return;
        };
    } );

} )( jQuery );

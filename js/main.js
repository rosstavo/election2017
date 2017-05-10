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
            game = [],
            csrf = $( '#csrf_token' ).val(),
            dirtyNames = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "boooooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dicks", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
            intro = "<p>You see <a class=\"prefill\">Labour</a>, <a class=\"prefill\">Conservative</a>, <a class=\"prefill\">Liberal Democrats</a>, <a class=\"prefill\">UKIP</a>, <a class=\"prefill\">Green</a>, and the <a class=\"prefill\">SNP</a>. Who do you give your vote to?</p><p class=\"tip\"><strong>Tip:</strong> You can click the options to prefill the answer box.</p>";

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
                        question: "<p>As you cycle out of the village green, <strong>Theresa May</strong> ambushes you from a large broccoli-like tree. As she swings down, the sunlight catches her <a href=\"http://www.bbc.co.uk/news/uk-politics-38287637\" class=\"ref\" target=\"blank\">shiny trousers</a> and you're momentarily blinded.</p><p>&ldquo;We are the party of <a href=\"http://www.telegraph.co.uk/news/2017/04/26/pmqs-times-theresa-may-says-strong-stable/\" class=\"ref\" target=\"blank\">strong and stable leadership</a>,&rdquo; she says. &ldquo;It&rsquo;s in the nation&rsquo;s best interest to vote Conservative.&rdquo;</p><p>Do you <a class=\"prefill\">argue</a>, <a class=\"prefill\">run</a>, or <a class=\"prefill\">defect</a>?</p>",
                        replies: [
                            {
                                answers: [ 'argue', 'a', '1' ],
                                result: "<p>You start to <strong>argue</strong> that Mrs. May&rsquo;s headstrong Brexit plan places the union in danger. &ldquo;I will not be participating in any <a href=\"http://www.bbc.co.uk/news/uk-politics-39633696\" class=\"ref\" target=\"blank\">television debates</a>!&rdquo; she exclaims, and runs off. You proceed along your way.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'run', 'b', '2' ],
                                result: "<p>You try to <strong>run</strong>, but the spots in front of your eyes obscure a gentleman on a Boris Bike, who collides with you. You never cast your vote, the Conservatives get re-elected via a majority, and they ruin the NHS, so you can't get treated. You die after waiting a week in A&amp;E with no water.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'defect', 'c', '3' ],
                                result: "<p>Convinced by her argument, you defect to the Conservatives. Besides, nevermind Tory cuts to the NHS and schools, Corbyn’s actually a bit of a wally isn’t he? Newly liberated to Capitalist ideals, you discard your &ldquo;<a href=\"https://www.thetimes.co.uk/article/marr-is-snubbed-for-a-day-at-church-9ds5783n35h\" class=\"ref\" target=\"blank\">Chairman Mao</a>&rdquo; bicycle and pick up the phone to hire a Limo for the rest of the journey.</p>",
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
                        question: "<p>You ride past some large skidmarks, and round the corner you encounter the <a href=\"http://www.bbc.co.uk/news/uk-politics-eu-referendum-36379061\" class=\"ref\" target=\"_blank\">Brexit bus</a>, balanced precariously on the <a href=\"https://www.youtube.com/watch?v=HZCaSyid4m0\" class=\"ref\" target=\"_blank\">edge of a cliff</a>. You step inside to see <strong>Nigel Farage</strong>, <strong>Boris Johnson</strong>, and <strong>Michael Gove</strong> at the end of the bus nearest you, and a large stack of cash labelled &ldquo;NHS budget&rdquo; at the far end.</p><p>Do you <a class=\"prefill\">barter</a> with them, <a class=\"prefill\">retrieve</a> the cash yourself, or <a class=\"prefill\">exit</a> the bus?</p>",
                        replies: [
                            {
                                answers: [ 'barter', 'a', '1' ],
                                result: "<p>You <strong>barter</strong> a deal, where you offer your help in exchange for a guarantee the cash goes to the NHS. At that moment <strong>Donald Tusk</strong> also gets on the bus and interferes, stating &ldquo;No trade negotiations until after Brexit has been finalised.&rdquo; Now weighed down by 5 people, the bus becomes more stable, allowing the cash to be retrieved.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'retrieve', 'b', '2' ],
                                result: "<p>The NHS means a lot to you so you decide it&rsquo;s in the national interest to <strong>retrieve</strong> the cash. You get on your front and crawl down the bus, but as you get close, the three men step off the bus. Your weight causes the bus to teeter over the edge, carrying you down into oblivion.</p><p>You never cast your vote, the Conservatives get re-elected via a landslide majority, and despite surviving the fall you can&rsquo;t get a doctor to see you on a weekend, so you die.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'exit', 'c', '3' ],
                                result: "<p>&ldquo;Hang on a minute lads, I&rsquo;ve got a great idea,&rdquo; you say. You <strong>exit</strong> the bus and cycle away, deciding they should take responsibility for the mess they&rsquo;ve made. Onwards to the polling station!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'school meal', 'use school meal' ],
                                result: "<p>You eat your <strong>school meal</strong> as it&rsquo;s a lot harder to think clearly on an empty stomach.</p><p>&ldquo;Hang on a minute lads, I&rsquo;ve got a great idea,&rdquo; you say. &ldquo;Boris, call the <em>Financial Times</em> and tell them you&rsquo;re going to commission something ridiculous like a <a href=\"http://www.independent.co.uk/news/uk/politics/royal-yacht-britannia-monarchy-boris-johnson-republic-money-a7628416.html\" class=\"ref\" target=\"blank\">Royal Yacht</a>.&rdquo;</p><p>The <em>FT</em> snaps it up and publishes the article, causing the Pound to lose value, which in turn reduces the weight of the cash at the end of the bus allowing it to be retrieved.</p>",
                                itemRequired: 'school meal',
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'money', 'use money' ],
                                result: "<p>It seems like a simple solution really. &ldquo;Lads, forget about that cash. I have some <strong>money</strong>, and the rest we can just borrow.&rdquo; They nod in agreement, and you give them your money. Once they&rsquo;re gone, you ring Ed Miliband as you know he has a heavy stone you can use to rebalance the bus. You retrieve the cash and go on your way.</p>",
                                itemRequired: 'money',
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
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station. You go to the newsagents and spend your <strong>money</strong> on thousands of penny sweets.</p><p>You never cast your vote and the Conservatives get elected via a majority, and ruin the NHS. Eating all the sweets makes you unwell, and you die of a stomach impaction.</p>",
                                itemRequired: 'money',
                                gameover: false
                            }
                        ]
                    }
                ],
                endresult: "<ul>Labour is elected via a majority. Your one vote made the difference!</li><li>The new Labour cabinet decides to back out and stay in the EU, knowing whatever choice they make will antagonise half of its voters regardless—which it does. Meanwhile due to increased corporation tax rates, Starbucks closes all UK branches, disaffecting the other half of Labour voters.</li><li>The government overspends on its manifesto, plunges the country further into debt, and Jeremy Corbyn enrols in a <a href=\"https://www.capmoney.org/\" class=\"ref\" target=\"blank\">CAP Money</a> course.</li><li>Mr. Corbyn scraps Trident and disposes of all lethal weapons. Sensing their time to strike, the country is taken over by the foxes, who begin hunting humans in retribution.</ul>"
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
                        question: "<p>As you&rsquo;re waiting for Sebastien to appear, Jeremy Corbyn rides by on his bicycle. He spots your blue rosette and pulls over.  &ldquo;I see you’re voting Conservative,&rdquo; he says. &ldquo;Wouldn&rsquo;t you rather have a government for the many, not the few?&rdquo;</p><p>Do you <a class=\"prefill\">ignore</a>, <a class=\"prefill\">run</a>, or <a class=\"prefill\">defect</a>?</p>",
                        replies: [
                            {
                                answers: [ 'ignore', 'a', '1' ],
                                result: "<p>You <strong>ignore</strong> Jeremy Corbyn, remembering he is an essentially benign Islingtonian herbivore. Frustrated at getting no response, Mr. Corbyn moves away to a pair of working class vapers sitting outside the pub. At that moment, the Rolls pulls up.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'run', 'b', '2' ],
                                result: "<p>You choose to <strong>run</strong>. In your desperation to get away, you run into the road, only for Sebastien to arrive at that very moment, hitting you with your own Rolls Royce. As you lay dying, the irony is not lost on you.</p><p>You never cast your vote, Labour gets elected via a majority, and they introduce the mansion tax so your family sells the estate to pay for your funeral.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'defect', 'c', '3' ],
                                result: "<p>Convinced by his argument, you <strong>defect</strong> to Labour. Besides, you have a severe allergy to cress, and <em>Heaven forbid</em> you eat the wrong sandwich at Julian’s birthday tea party like last year and have to rely on the NHS to treat you. You pop into Halfords to buy a bicycle and head on your way.</p>",
                                gameover: false,
                                defect: 'labour'
                            },
                            {
                                answers: [ 'use item', 'money', 'use money' ],
                                result: "<p>You offer Mr. Corbyn your <strong>money</strong> to go away. He seems pretty desperate to find the cash needed to fund his manifesto, and gleefully takes it. You can’t resist a parting blow. &ldquo;Don&rsquo;t let <a href=\"http://www.bbc.co.uk/news/election-2017-39775693\" class=\"ref\" target=\"blank\">Diane Abbott</a> count it eh? Ha-hah!&rdquo;</p><p>He cycles off with a scowl.</p>",
                                itemRequired: 'money',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>En-route you find <strong>Theresa May</strong> in a skip, emitting sparks and repeating the phrase &ldquo;strong and stable leadership&rdquo; over and over. Looks like she&rsquo;s malfunctioned again and is going to need fixing.</p><p>Do you <a class=\"prefill\">attempt the repairs</a> yourself, call a <a class=\"prefill\">mechanic</a>, or blind-dial a <a class=\"prefill\">random number</a>?</p>",
                        replies: [
                            {
                                answers: [ 'attempt the repairs', 'repairs', 'a', '1' ],
                                result: "<p>You <strong>attempt the repairs</strong> yourself, hoping there&rsquo;ll be something obviously wrong when you open up the hood. You prod the circuit board, causing her to bolt upright with red laser-focussed eyes. A robotic voice sparks into life: &ldquo;Acquiring targets! Disability benefits claimants! Junior doctors!! Rape victi&mdash;&rdquo;</p><p>You quickly pull a handful of wires out, and she powers down. You dump her back in the skip. With no-one in charge of the Conservatives, Labour get elected via a majority, and disposes of all lethal weapons. Sensing their time to strike, the country is taken over by the foxes, who begin hunting humans in retribution.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'mechanic', 'call a mechanic', 'b', '2' ],
                                result: "<p>You call a <strong>mechanic</strong>, who opens up the hood. &ldquo;There&rsquo;s your problem. The sound-byte circuit is fried. Looks like it was short-circuited by a copy of the <em>1975 Conservative manifesto</em>.&rdquo;</p><p>He says the part can be replaced but due to its age the part has to be made-to-order and takes up to 12 weeks to arrive. Since that&rsquo;s no good, you just leave her as-is and hope no-one will notice. On to the polling station.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'random number', 'blind-dial', 'blind dial', 'blind-dial a random number', 'c', '3' ],
                                result: "<p>You close your eyes and punch in a <strong>random number</strong>. The Behemoth team answer the phone and reprogramme her for the new season of <em>Robot Wars</em>, competing under the name &ldquo;May-hem&rdquo; with the team slogan &ldquo;Crush the Saboteurs.&rdquo; Aided by her new saw-blades for arms, her public popularity raises to even greater heights than before. On to the polling station.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'money', 'use money' ],
                                result: "<p>The only way you&rsquo;ll get a proper repair is if you splash a bit of <strong>money</strong>, so you ring up <strong>Elon Musk</strong> who agrees to repair Mrs. May. All seems to be functioning normally, except now she has a blind-spot for <a href=\"https://www.theguardian.com/technology/2016/jun/30/tesla-autopilot-death-self-driving-car-elon-musk\" class=\"ref\" target=\"blank\">white vehicles joining her lane</a>. It&rsquo;s probably <a href=\"http://www.thenational.scot/news/15226300.Scottish_Tories_engulfed_in_racism_scandal_with_at_least_seven_council_candidates_now_in_the_spotlight/\" class=\"ref\" target=\"blank\">nothing to worry about</a>.</p>",
                                itemRequired: 'money',
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'school meal', 'use school meal' ],
                                result: "<p>You still have your <strong>school meal</strong> left over, which you offer to Mrs. May. Turns out she was just really hungry. You can empathise, from that time you had to use food banks. You leave the newly reinvigorated Mrs. May and head to the polling station.</p>",
                                itemRequired: 'school meal',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. <strong>Theresa May</strong> is stood there awkwardly by herself. You ignore her too and go chat to your local Conservative candidate.</p><p>After a few words you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with the Conservatives?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Just like <a href=\"http://www.bbc.co.uk/news/uk-politics-36672591\" class=\"ref\" target=\"blank\">Michael Gove&rsquo;s cold knife</a> into the back of Boris &lsquo;Julius&rsquo; Johnson, you betray your party and <strong>leave</strong> for your constituency's Independent candidate. Your vote hits the bottom of the ballot box. Outside you hear a cockerel crow. Congratulations, you successfully voted!</p>",
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
                endresult: "<ul><li>The Conservatives are elected via a majority. Your vote was a mere droplet in an unstoppable tide of blue.</li><li>With her new five-fold majority government, Theresa May assumes a mandate for a full Brexit, walling off the Eurotunnel and deploying gunboats off the coast. The first victim is national treasure David Walliams on a charity swim.</li><li>Upon hearing that Piers Morgan is slated to fill his seat on Britain&rsquo;s Got Talent, the proletariat gather and raze the City, Parliament and all of Maidenhead.</li><li>The Green party are elected in 2020 and ban the Grand National, meat, and the Queen.</li></ul>"
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
                        question: "<p>You enter the car park only to see <strong>Boris Johnson</strong> applying a Union Jack sticker over the EU badge on your numberplate.</p><p>Do you <a class=\"prefill\">confront</a>, <a class=\"prefill\">attack</a>, or <a class=\"prefill\">wait</a> until he&rsquo;s gone to peel the sticker off?</p>",
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
                                result: "<p>You wait until Mr. Johnson has left the scene and lean down to peel the sticker off. Unfortunately it&rsquo;s one of those stickers that peels off rather unsatisfyingly and it takes you hours to remove, leaving a grubby residue.</p><p>By the time you make it to the polling station it&rsquo;s closed so you never cast your vote. The Conservatives are elected via a landslide majority, enact a hard Brexit, and Mr. Johnson uses NHS money to commission a <a href=\"http://www.independent.co.uk/news/uk/politics/royal-yacht-britannia-monarchy-boris-johnson-republic-money-a7628416.html\" class=\"ref\" target=\"blank\">Royal Yacht</a>, thinking it will make trade deals easier with the &ldquo;<a href=\"http://www.telegraph.co.uk/comment/personal-view/3571742/If-Blairs-so-good-at-running-the-Congo-let-him-stay-there.html\" class=\"ref\" target=\"blank\">piccaninnies</a>.&rdquo;</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'straight banana', 'use straight banana', 'use banana', 'banana' ],
                                result: "<p>You eat the <strong>straight banana</strong> and discreetly place the peel behind Mr. Johnson. He steps back—and obviously doesn&rsquo;t slip because this isn&rsquo;t <em>Mario Kart</em>, and bananas really aren&rsquo;t that slippery. However his general oafishness causes him to trip over anyway. You remove the sticker and go on your way.</p>",
                                itemRequired: 'straight banana',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>As you park up, a man approaches you. &ldquo;You&rsquo;re absolute disgrace!&rdquo; he says. He must have seen your Liberal Democrat badge.</p><p>Do you <a class=\"prefill\">call him matey</a>, give him an <a class=\"prefill\">awkward kiss</a> on the cheek, or invite him to <a class=\"prefill\">smell your spaniel</a>?</p>",
                        replies: [
                            {
                                answers: [ 'call him matey', 'matey', 'a', '1' ],
                                result: "<p>This sort of situation calls for your personable centrist charm, so you reply, &ldquo;Hello <strong>matey</strong>! Why am I a disgrace, mi&rsquo;old China?&rdquo; Keep up that flawless disguise, and he might mistake you for a fellow member of the working class.</p><p>&ldquo;You’ve parked in front of my drive,&rdquo; he explains. <em>Whoops</em>&mdash;you’d just assumed it was a political thing from past experience. You hastily apologise and park further down the road.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'awkward kiss', 'kiss', 'b', '2' ],
                                result: "<p>You can&rsquo;t stand conflict, so you attempt to dispel the confrontation with an <strong><a href=\"http://www.express.co.uk/news/uk/799786/Lib-Dem-leader-Tim-Farron-kisses-Brexit-voter-Oxfordshire-Theresa-May-Brussels-EU\" class=\"ref\" target=\"blank\">awkward kiss</a></strong> on the man’s cheek. He immediately lamps you, knocking you out.</p><p>You never cast your vote, the Conservatives get re-elected via a landslide majority, and they ruin the NHS, so you can't get treated. You die after waiting a week in A&E with no water.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'smell your spaniel', 'spaniel', 'smell my spaniel', 'c', '3' ],
                                result: "<p>You panic and flounder about thinking of things Tim Farron might say in the situation.  &ldquo;Uuh&mdash;<strong><a href=\"http://www.newstatesman.com/politics/june2017/2017/04/tim-farron-being-unfairly-maligned-inviting-us-smell-his-spaniel\" class=\"ref\" target=\"blank\">Smell my spaniel</a></strong>&hellip;?&rdquo;</p><p>Too late now, you’ve verbalised it. You don&rsquo;t even own a dog. He seems just as baffled, so you leg it while he’s stupefied.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'straight banana', 'use straight banana', 'use banana', 'banana' ],
                                result: "<p>You engage the man in a discussion about the EU. Once you demonstrate how <a href=\"http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:31994R2257:EN:HTML\" class=\"ref\" target=\"blank\">aesthetically pleasing</a> and tasty the <strong>straight banana</strong> is, his whole Brexit argument collapses. Now unimpeded, you can head to the polling station.</p>",
                                itemRequired: 'straight banana',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. <strong>Tim Farron</strong> is there outside to greet you and introduce you to your local Liberal Democrat party candidate.</p><p>After a few words you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with the Lib Dems?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Just like Nick Clegg with University tuition fees, you betray your party and <strong>leave</strong> for your constituency's Independent candidate. Your vote hits the bottom of the ballot box. Outside you hear a cockerel crow. Congratulations, you successfully voted!</p>",
                                defect: 'independent',
                                gameover: false
                            },
                            {
                                answers: [ 'remain', 'b', '2' ],
                                result: "<p>You close your eyes, think of the EU, and <strong>remain</strong> true to the Liberal Democrats. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'straight banana', 'use straight banana', 'use banana', 'banana' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station. You sit on the polling station steps and take a bite of your <strong>straight banana</strong>, only to discover you&rsquo;d actually been given a plantain. You&rsquo;re too dejected to care.</p><p>You never cast your vote, the Conservatives are elected via a majority, and Tim Farron is kicked out of his seat by <a href=\"https://twitter.com/hashtag/VoteFishFinger\" class=\"ref\" target=\"blank\">Mr. Fish Finger</a>.</p>",
                                itemRequired: 'straight banana',
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'lotto scratchcard', 'use lotto scratchcard', 'use scratchcard', 'scratchcard' ],
                                result: "<p>You can’t let Rafi know you’re secretly a UKIP supporter, so rather than voting you choose instead to exit the polling station. Hoping it will improve your day, you scratch off your <strong>Lotto scratchcard</strong>, revealing you&rsquo;ve won a huge jackpot!</p><p>You never cast your vote, the Liberal Democrats are elected via a surprise majority, keep the UK in Europe, and you notice that the scratchcard expired in 2014.</p>",
                                itemRequired: 'lotto scratchcard',
                                gameover: true
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>The Liberal Democrats are elected via a majority. Your one vote made the difference!</li><li>The new government attempts to repeal Article 50, however is forced to adopt the Euro as its currency as part of a list of terms Brussels draws up out of spite for wasting its time. The treasury loses £1.5 billion (&euro;1.78 billion) on now-useless new £1 coins.</li><li>Mr. Farron calls an end to first-past-the-post, instead implementing a Eurovision-style voting system after seeing it work so well in 2016 (it really keeps the suspense right until the last moment). David Dimbleby is replaced for future overnight election specials by Graham Norton.</li><li>After all that effort, the EU collapses anyway.</li></ul>"
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
                        question: "<p>You enter the car park only to see <strong>Tim Farron</strong> replacing the St. George&rsquo;s Cross window flags on your Transit van with that of the European Union.</p><p>Do you <a class=\"prefill\">confront</a>, <a class=\"prefill\">attack</a> alone, or <a class=\"prefill\">wait</a> for the lads to arrive?</p>",
                        replies: [
                            {
                                answers: [ 'confront', 'a', '1' ],
                                result: "<p>You choose to <strong>confront</strong> Mr. Farron. &ldquo;Typical Remoaner!&rdquo; you cry. You remove the flags and attempt to burn them, but due to EU regulations on fire prevention, <a href=\"https://www.youtube.com/watch?v=TQRg7wH_FC0\" class=\"ref\" target=\"blank\">they don&rsquo;t catch</a>.</p><p>Doesn&rsquo;t matter anyway, you still won the referendum. Soon you&rsquo;ll be able to burn any flag you like. You hop in the van and pull out of the car park.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'attack', 'b', '2' ],
                                result: "<p>You choose to <strong>attack</strong> Mr. Farron by yourself. However as you raise your proud British fist to strike him, your wrist is grabbed from behind. It&rsquo;s <strong>Nigel Farage.</strong></p><p>&ldquo;Calm down my friend, it&rsquo;s not the British way. Where&rsquo;s your stiff upper lip?&rdquo;</p><p>Since it&rsquo;s coming from Mr. Farage, you can see the logic. You walk past Mr. Farron and hop in the van.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'wait', 'c', '3' ],
                                result: "<p>You <strong>wait</strong> for the lads to arrive and approach Mr. Farron. However, <a href=\"http://www.bbc.co.uk/news/election-2015-32601281\" class=\"ref\" target=\"blank\">just like in the last election</a>, your high numbers don&rsquo;t seem to count for much and he easily overpowers you and your gang. As he takes off in your transit van, you concede he made a strong opposition.</p><p>You never cast your vote, the Liberal Democrats get elected via a majority, keep the UK in Europe and the foreman hires a Pole in the position your hospitalisation left vacant.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'lotto scratchcard', 'use lotto scratchcard', 'use scratchcard', 'scratchcard' ],
                                result: "<p>While Mr. Farron has his back turned, you place the <strong>lotto scratchcard</strong> on the ground, hoping his <a href=\"https://en.wikipedia.org/wiki/Libertarianism\" class=\"ref\" target=\"blank\">Libertarian stance</a> of individuals having the ethical right to the product of their own labour will convict him to repatriate the scratchcard to its rightful owner.</p><p>Your plan works flawlessly as he picks it up and starts to approach passers-by one-by-one. You hop in your van and head towards the polling station.</p>",
                                itemRequired: 'lotto scratchcard',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You&rsquo;re feeling rather peckish so you stop by the <em>Bengal Pavilion</em> for a true British chicken tikka massala. The owner, Rafi, is a close friend of yours. He&rsquo;s the good kind of immigrant.</p><p>When you arrive, the shop is plastered with graffiti, which Rafi is scrubbing hard to remove. &ldquo;%name%, my friend! Look at all this anti-Muslim vandalism! Can you believe it?&rdquo;</p><p>Awkwardly, it&rsquo;s signed &ldquo;UKIP 2017.&rdquo; Do you <a class=\"prefill\">help</a> out, <a class=\"prefill\">distance yourself</a>, or go off on a <a class=\"prefill\">rant</a>?</p>",
                        replies: [
                            {
                                answers: [ 'help', 'a', '1' ],
                                result: "<p>You grab a sponge and <strong>help</strong> Rafi out, in true British wartime spirit. Thanks to your assistance, you finish the job fast enough to ensure you both have plenty of time to get to the polling station before it closes, and he gives the curry to you for free. Now that&rsquo;s true British values.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'distance yourself', 'b', '2' ],
                                result: "<p>You don&rsquo;t want it to be awkward, so you <strong>distance yourself</strong> from the vandal.</p><p>&ldquo;Who&rsquo;d do such a thing?&rdquo; you say. &ldquo;Not a&mdash;erm&mdash;<strong>Liberal Democrat</strong> voter such as myself.&rdquo;</p><p>You mouth an expletive. Even worse, Rafi finishes up and says he&rsquo;ll tag along with you to the polling station. No getting out of it now, it would be too embarrassing.</p>",
                                defect: 'libdem',
                                gameover: false
                            },
                            {
                                answers: [ 'rant', 'c', '3' ],
                                result: "<p>You launch on a rant, criticising the vandal for suggesting Rafi is a Muslim, and for associating Rafi with the oppressive <a href=\"https://www.theguardian.com/politics/2017/apr/23/ukip-to-campaign-to-ban-burka-and-sharia-courts-says-paul-nuttall\" class=\"ref\" target=\"blank\">Burqa</a>, which should clearly be banned.</p><p>Awkwardly you&rsquo;re unaware that the <em>Bengal Pavilion</em> is a <a href=\"https://en.wikipedia.org/wiki/Islam_in_Bangladesh\" class=\"ref\" target=\"blank\">Bangladeshi</a> curry house. Rafi exacts his revenge by serving you a vindaloo instead of your tikka massala. You spend the rest of the day on the toilet, never cast your vote, and the Liberal Democrats are elected via a surprise majority, keeping the UK in the EU and adopting the Euro.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'use item', 'lotto scratchcard', 'use lotto scratchcard', 'use scratchcard', 'scratchcard' ],
                                result: "<p>Sensing Rafi needs cheering up, and recalling £10 is the most you&rsquo;ve ever won from a <strong>Lotto scratchcard</strong>, you make a safe offer. &ldquo;Your friendship has taught me that gambling is not <em>Haram</em>, so I will scratch it now and give you whatever I win.&rdquo;</p><p>Your face contorts as you scratch it off to reveal, predictably, you&rsquo;ve won the jackpot. It would be un-British to <a href=\"http://www.bbc.co.uk/news/uk-politics-39742407\" class=\"ref\" target=\"blank\">backslide on an agreement</a>, so you give the money to Rafi, who promises to open up a chain of <em>Bengal Pavilions</em> across the country.</p>",
                                itemRequired: 'lotto scratchcard',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. <strong>Paul Nuttall</strong> is there outside to greet you and introduce you to your local UKIP candidate.</p><p>After a few words, and some interesting <a href=\"http://www.independent.co.uk/news/uk/politics/ukip-candidate-gisela-allen-glasgow-garscadden-scotstounhill-attraction-gorillas-being-gay-a7699126.html\" class=\"ref\" target=\"blank\">revelations about gorillas</a>, you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with UKIP?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Just like <a href=\"https://www.theguardian.com/politics/2017/mar/25/ukips-only-mp-douglas-carswell-quits-party\" class=\"ref\" target=\"blank\">Douglas Carswell</a>, you betray your party and <strong>leave</strong> for your constituency's Independent candidate. Your vote hits the bottom of the ballot box. Outside you hear a cockerel crow. Congratulations, you successfully voted!</p>",
                                defect: 'independent',
                                gameover: false
                            },
                            {
                                answers: [ 'remain', 'b', '2' ],
                                result: "<p>You close your eyes, think of Britain&rsquo;s Judeo-Christian cultural heritage, and <strong>remain</strong> true to UKIP. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'lotto scratchcard', 'use lotto scratchcard', 'use scratchcard', 'scratchcard' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you choose instead to exit the polling station. Hoping it will improve your day, you scratch off your <strong>Lotto scratchcard</strong>, revealing you&rsquo;ve won a huge jackpot!</p><p>You never cast your vote, the Liberal Democrats are elected via a surprise majority, keep the UK in Europe, and you notice that the scratchcard expired in 2014.</p>",
                                itemRequired: 'lotto scratchcard',
                                gameover: true
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>UKIP are elected via a majority. Your one vote made the difference!</li><li>As his first act in power, Mr. Nuttall reintroduces the poll tax, only this time just for Poles.</li><li>All other EU migrants are chucked out of Britain, bringing various workforces (most notably the NHS) to a standstill, leading to thousands of easily treatable deaths, including that of Mr. Nuttall who dies of exposure while campaigning in Skegness.</li><li>Everyone dies of dysentery after public toilets overflow into the streets.</li></ul>"
            },
            'green' : {
                names: [ 'green', 'green party', 'greens', 'g', 'gr', 'gre', 'gree', '5' ],
                colour: '#2ecc71',
                item: 'organic courgette',
                stages: [
                    {
                        replies: [
                            {
                                result: "<p>Your heart leads you to the <strong>Green</strong> party. As a voting incentive, you&rsquo;re given an <strong>organic courgette</strong>. Just need some tofu now and that&rsquo;s Friday&rsquo;s dinner party sorted.</p><p>You start towards the car park where you left your Nissan Leaf, as you'll be heading to the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>You enter the car park to find your Nissan Leaf on bricks. You&rsquo;ve always regretted trading your bicycle in, but that&rsquo;s <a href=\"https://www.thetimes.co.uk/article/marr-is-snubbed-for-a-day-at-church-9ds5783n35h\" class=\"ref\" target=\"blank\">Corbyn&rsquo;s thing</a> now.</p><p>Nearby, <strong>Paul Nuttall</strong> is addressing a crowd. The raised platform he&rsquo;s standing on is clearly propped up on your wheels.</p><p>Do you <a class=\"prefill\">attack</a> him, call upon your <a class=\"prefill\">woodland friends</a>, or <a class=\"prefill\">reprimand</a> Mr. Nuttall?</p>",
                        replies: [
                            {
                                answers: [ 'attack', 'a', '1' ],
                                result: "<p>You approach Mr. Nuttall to <strong>attack</strong> him. You swing your fist with the goal of knocking him unconscious. However your vegan diet has severely weakened your muscles and he barely even acknowledges the contact.</p><p>Footage of the incident is shared among alt-right news sites with the title &ldquo;BRAVE speech TRIGGERS SJW to VIOLENT ATTACK!&rdquo; By the time you get your wheels back, it&rsquo;s too late to vote. The Conservatives get re-elected via a majority, your boss fires you, and you can&rsquo;t find any food at the food bank without meat in it.</p>",
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
                                result: "<p>You offer your <strong>organic courgette</strong> to Mr. Nuttall, explaining that it could make a sturdy replacement as a prop for the stage due to its excellent genetics. He looks blankly at it, suggesting this might be the first marrow he&rsquo;s ever seen, but after a while he sees his own reflection in it and agrees to make the trade. You reattach your wheels and continue on your way.</p>",
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
                                result: "<p>You run to the pedestal and belt out &ldquo;<a href=\"https://www.youtube.com/watch?v=GibiNy4d4gc\" class=\"ref\" target=\"_blank\"><em>Naaaaants</em> ingon<em>yaaa</em>ma bagithi <em>Baba!</em></a>&rdquo; holding the <strong>organic courgette</strong> aloft like Rafiki holding Simba in <em>The Lion King.</em></p><p>The crowd is stunned. Mrs. May is paralysed into a stupor. You looked like a bit of a wally, but who&rsquo;s going to remember what Mrs. May was saying now? You retire the courgette, having fulfilled its greater purpose.</p><p>You get back in the car feeling smug and head to the polling station.</p>",
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
                                result: "<p>Your heart leads you to the Scottish National Party. As a voting incentive, you are given an oversized saltire-clad pair of <strong>scissors</strong>.</p><p>With spirit and determination, you set out across the Highlands towards the polling station.</p>",
                            }
                        ]
                    },
                    {
                        question: "<p>As you crest the braigh, you run into <strong>Theresa May</strong> in <a href=\"https://www.theguardian.com/politics/2016/aug/12/theresa-may-seeks-peace-and-quiet-on-alpine-walking-holiday\" class=\"ref\" target=\"_blank\">full hiking equipment</a>, gale force winds whipping her hair around. &ldquo;A fine country,&rdquo; she shouts. Aye.</p><p>She continues, &ldquo;&mdash;but greater as part of a United Kingdom under my <a href=\"http://www.telegraph.co.uk/news/2017/04/26/pmqs-times-theresa-may-says-strong-stable/\" class=\"ref\" target=\"_blank\">strong and stable leadership</a>.&rdquo;</p><p>Do you <a class=\"prefill\">ignore</a>, <a class=\"prefill\">attack</a>, or <a class=\"prefill\">contend</a> Mrs. May?</p>",
                        replies: [
                            {
                                answers: [ 'ignore', 'a', '1' ],
                                result: "<p>You outwardly <strong>ignore</strong> Mrs. May&rsquo;s blatant insult, and pensively fix your gaze on the moor in front of you. You&rsquo;re so offended you can’t move.</p><p>Years pass. Humans from a future civilisation discover your calcified remains. You never cast your vote, the Conservatives are elected via a majority, and kill all the poor to save on welfare.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'attack', 'b', '2' ],
                                result: "<p>You <strong>attack</strong> Mrs. May, unsheathing your claymore and hewing her hiking poles in twain. Suddenly imbalanced, she falls backwards and rolls down the side of the torr.</p><p>You quote <a href=\"http://www.imdb.com/title/tt0112573/quotes?item=qt0440126\" class=\"ref\" target=\"_blank\">William Wallace</a>: &ldquo;Every man dies, not every man really lives.&rdquo;</p><p>Indeed.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'contend', 'c', '3' ],
                                result: "<p>You <strong>contend</strong> Mrs. May&rsquo;s statement. &ldquo;Not so strong and stable to call a snap election in the middle of Brexit negotiations is it now?&rdquo; To add emphasis to your point, you give her a shove and she falls backwards and rolls down the hill. Genius.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'scissors', 'use scissors', 'use pair of scissors', 'pair of scissors' ],
                                result: "<p>You pull out your <strong>scissors</strong>. Stooping to the ground, you cut a Scotch thistle and present it to Mrs. May with a warning: &ldquo;<a href=\"https://en.wikipedia.org/wiki/Nemo_me_impune_lacessit\" class=\"ref\" target=\"_blank\">Wha daur meddle wi' me?</a>&rdquo;</p><p>She is clearly intimidated, but opportunistically snatches the scissors from you&mdash;probably to make more benefit cuts&mdash;and power-walks away. You descend down the mountainside and venture out into the heath.</p>",
                                itemRequired: 'scissors',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You reach a golf course. A large helicopter descends and out climbs <strong>President Donald Trump</strong>. You still haven&rsquo;t let go of your offence at him suggesting Scotland was <a href=\"https://twitter.com/realDonaldTrump/status/746272130992644096\" class=\"ref\" target=\"blank\">pleased about the referendum result</a> (despite having already called him a &ldquo;custard-flavoured dobby&rdquo; on Twitter).<p>Do you <a class=\"prefill\">attack</a> President Trump, <a class=\"prefill\">protest</a> him, or <a class=\"prefill\">cry freedom</a>?</p>",
                        replies: [
                            {
                                answers: [ 'attack', 'a', '1' ],
                                result: "<p>You decide to <strong>attack</strong> President Trump. However it&rsquo;s obvious you&rsquo;ll just get shot by the secret service if you attack the President head-on, so you get a punnet of golf balls from the driving range and pepper the President and his entourage, who mistake the hurtling balls for hail having been warned about Scotland&rsquo;s inclement weather.</p><p>This turns out to be incredibly cathartic and enjoyable. You&rsquo;re too distracted to cast your vote, the Conservatives are elected via a majority, and scrap the triple-lock on pensions. You eventually retire at the age of 87.</p>",
                                gameover: true
                            },
                            {
                                answers: [ 'protest', 'b', '2' ],
                                result: "<p>In true democratic spirit, you <strong>protest</strong> President Trump&rsquo;s presence, roasting him with a placard reading &ldquo;Bawbag-eyed blinkered heid-the-baw.&rdquo; It doesn&rsquo;t create much of a ripple, but it does make you feel better, and later on you get the pride of being the subject of a tweet:</p><p>&ldquo;Protester today couldn&rsquo;t even speak English. Probably an illegal immigrant paid by @georgesoros. Sad!&rdquo;</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'cry freedom', 'c', '3' ],
                                result: "<p>You puff out your chest and <strong>cry freedom</strong>. The words echo around the valley, alerting the clans who form up in your aid. Unable to withstand the power of your combined spirit, an intimidated President Trump flees, narrowly avoiding the offshore wind turbines in his helicopter. After erecting a monument to mark the event, you leave the clansmen and women and go forth towards the polling station.</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'scissors', 'use scissors', 'use pair of scissors', 'pair of scissors' ],
                                result: "<p>As you approach the crowd, you gather President Trump is there to open a new spa. You charge out, <strong>scissors</strong> raised, and slice the ribbon across the entrance. His entourage of secret service agents open fire, but you use your oversized scissors to deflect the bullets. You leg it, discarding the now broken scissors in the brush.</p><p>Meanwhile, <strong>Ben Carson</strong> is ordered by President Trump to hold the ribbon together so he can still pretend to be the one who opened the building. The ribbon falls and everyone applauds.</p>",
                                itemRequired: 'scissors',
                                gameover: false
                            }
                        ]
                    },
                    {
                        question: "<p>You finally arrive at the polling station. <strong>Nicola Sturgeon</strong> is there outside to greet you and introduce you to your local SNP candidate.</p><p>After a few words you realise you've made an awful mistake. Do you <a class=\"prefill\">leave</a> the party and go with the Independent candidate, or <a class=\"prefill\">remain</a> with the SNP?</p>",
                        replies: [
                            {
                                answers: [ 'leave', 'a', '1' ],
                                result: "<p>Like the Massacre of Glencoe, you betray your party and <strong>leave</strong> for your constituency&rsquo;s Independent candidate at the last moment. Your vote hits the bottom of the ballot box. Outside you hear a cockerel crow. Congratulations, you successfully voted!</p>",
                                defect: 'independent',
                                gameover: false
                            },
                            {
                                answers: [ 'remain', 'b', '2' ],
                                result: "<p>You close your eyes, think of the environment, and <strong>remain</strong> true to the Scottish National Party. Your vote hits the bottom of the ballot box. Congratulations, you successfully voted!</p>",
                                gameover: false
                            },
                            {
                                answers: [ 'use item', 'scissors', 'use scissors' ],
                                result: "<p>Faced with a tough decision and too weary to decide, you use your <strong>scissors</strong> to cut the ballot paper into confetti.</p><p>Unfortunately each small piece gets counted as a vote for the Conservatives, who win with a landslide majority and scrap the triple-lock on pensions. You eventually retire at the age of 87.</p>",
                                itemRequired: 'scissors',
                                gameover: true
                            }
                        ]
                    }
                ],
                endresult: "<ul><li>The Scottish National Party wins all the seats in Scotland. Your one vote made the difference!</li><li>You finally get indyref2, but due to 5 public votes in 5 years, caring fatigue strikes Scotland, meaning only 3 people turn out. Thankfully two of those were spoiled ballots, and Scotland gain Independence.</li><li>The UK Conservative government blocks Scotland from using Pound sterling. Nicola Sturgeon draws up plans for a sovereign currency on the back of a fag packet, but loses it shortly before the press conference announcing the new currency, which she ad-libs poorly.</li><li>The economy crashes and Scotland is forced to sell Nessie at a Japanese fish market to make up the deficit.</li></ul>"
            },
            'independent' : {
                names: [],
                colour: '#34495e',
                endresult: "<ul><li>Your Independent candidate is elected. Your one vote made the difference!</li><li>No one party achieves a majority in the Election. Unable to form a parliament, the Queen offers your new MP the job of Prime Minister, which she accepts.</li><li>After enacting some questionable policies (such as half-hourly bin collections, cycle paths for every road, and employing the &ldquo;dishy&rdquo; Judge Rinder as Justice Secretary) she finally finds her feet, becoming more universally popular than Margaret Thatcher and replacing her as the yardstick for lazy tabloid comparisons for future women PMs.</li><li>After 7 consecutive terms, she draws her last breath and dies in office. A gold statue to commemorate her is built in place of the London Eye.</li></ul>"
            }
        }


        /**
         * Turn autocomplete off on input
         */
        $(window).scrollTop(0);

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

            storeGame( game );
        }

        $.sanitize = function(input) {
        	var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
        				 replace(/<[\/\!]*?[^<>]*?>/gi, '').
        				 replace(/<style[^>]*?>.*?<\/style>/gi, '').
        				 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
            return output;
        };

        function storeGame( gameData ) {
            $.ajax({
                type: 'POST',
                url: 'app/log.php',
                data: {
                    game: JSON.stringify( gameData ),
                    csrf: csrf
                }
            });
        }

        /**
         * updateResponse() function, called every time stage progresses
         */
        function updateResponse() {

            // Get input value
            response = $.sanitize( input.val().toLowerCase() );

            if ( stage === 0 ) {

                title.addClass( 'title-reduced' );

                // We don't want any non-alphanumeric characters. Why? Cause I said so
                response = response.replace(/[^\w\s]/gi, '');

                // Define user name
                if ( response === "" || !/\S/.test( response ) ) {
                    name = "Anonymous Voter";
                } else {
                    name = response.replace(/[^\w\s]/gi, '');

                    if ( name.length > 20 ) {
                        name = name.substring( 0, 20 );
                    }
                }

                query.html( '<p>While you&rsquo;re walking through your constituency, you spy a crowd of dishevelled political activists behind trestle tables in the village green. It looks like they&rsquo;ve been standing there since the last election.</p>' );

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

                game.push( name );

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

                    game.push( party );
                }

            } else if ( stage === 3 || stage === 5 || stage === 7 ) {

                /**
                 * These are question stages demanding a user input
                 */

                var question = parties[party].stages[(stage - 1) / 2].question;

                question = question.replace( '%name%', '<span class="name"><strong>' + name + '</strong></span>' );

                // Find the question corresponding to user status
                query.html( question );

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
                    reply,
                    roundData = [];

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

                    // Add name to string if placeholder present
                    reply.result = reply.result.replace( '%name%', name );

                    // Show result
                    query.html( reply.result );

                    // Render inventory
                    renderInventory();

                    game.push( response );

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

                // Get people to register to vote
                query.append( '<p class="tip"><em>Note from the author:</em> Thankfully whatever happens, it won\'t be that bad. However to get the best possible outcome for the country this election season, remember to <a href=\"https://www.gov.uk/register-to-vote\" target=\"_blank\">register to vote!</a></p>' );

                // Show retry button
                retryButton();

                // Show footer
                footer.show();

                // Add final party to gamedata
                game.push( party );

                // Store gamedata in database
                storeGame( game );
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

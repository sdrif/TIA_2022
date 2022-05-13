% INSTRUCTIONS
% =swipl chatbot-server.pl=
% =:- start_server.=
%
% Then navigate to http://localhost:3000 in your browser
:- module(chatbot_server,
  [ start_server/0,
    stop_server/0
  ]
).

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/websocket)).
:- use_module(library(lists)).

% * root(chatbot) indicates we're matching the echo path on the URL e.g.
%   localhost:3000/chatbot of the server
% * We create a closure using =http_upgrade_to_websocket=
% * The option =spawn= is used to spawn a thread to handle each new
%   request (not strictly necessary, but otherwise we can only handle one
%   client at a time since chatbot will block the thread)
:- http_handler(root(chatbot),
                http_upgrade_to_websocket(chatbot, []),
                [spawn([])]).

start_server :-
    default_port(Port),
    start_server(Port).
start_server(Port) :-
    http_server(http_dispatch, [port(Port)]).

stop_server() :-
    default_port(Port),
    stop_server(Port).
stop_server(Port) :-
    http_stop_server(Port, []).

default_port(3500).


chatbot(WebSocket) :-
    ws_receive(WebSocket, Message, [format(json)]),
    ( Message.opcode == close
    -> true
    ; get_response(Message.data, Response),
      lire_question(Response.message, L_Mots),
      produire_reponse(L_Mots,L_ligne_reponse),
      writeln(L_ligne_reponse),
      flatten(L_ligne_reponse, FlattenList),
      atomics_to_string(FlattenList, ' ', ResponseString),
      ws_send(WebSocket, json(ResponseString)),
      chatbot(WebSocket)
    ).

%! get_response(+Message, -Response) is det.
% Pull the message content out of the JSON converted to a prolog dict
% then add the current time, then pass it back up to be sent to the
% client
get_response(Message, Response) :-
  get_time(Time),
  Response = _{message:Message.message, time: Time}.

/* --------------------------------------------------------------------- */
/*                                                                       */
/*        PRODUIRE_REPONSE(L_Mots,L_strings) :                           */
/*                                                                       */
/*        Input : une liste de mots L_Mots representant la question      */
/*                de l'utilisateur                                       */
/*        Output : une liste de strings donnant la                       */
/*                 reponse fournie par le bot                            */
/*                                                                       */
/*        NB Par défaut le predicat retourne dans tous les cas           */
/*            [  "Je ne sais pas.", "Les étudiants",                     */
/*               "vont m'aider, vous le verrez !" ]                      */
/*                                                                       */
/*        Je ne doute pas que ce sera le cas ! Et vous souhaite autant   */
/*        d'amusement a coder le predicat que j'ai eu a ecrire           */
/*        cet enonce et ce squelette de solution !                       */
/*                                                                       */
/* --------------------------------------------------------------------- */

produire_reponse([fin],[L1]) :-
    L1 = [merci, de, m, '\'', avoir, consulte], !.

produire_reponse(L,Rep) :-
    mclef(M,_), member(M,L),
    clause(regle_rep(M,_,Pattern,Rep),Body),
    match_pattern(Pattern,L),
    call(Body), !.

produire_reponse(_,[S1,S2,S3]) :-
   S1 = [je, ne, sais, pas, '.'],
   S2 = [les, etudiants, vont, m, '\'', aider, '.' ],
   S3 = ['vous le verrez !'].

match_pattern(Pattern,Lmots) :-
    sublist(Pattern,L_mots).

match_pattern(LPatterns,Lmots) :-
    match_pattern_dist([100|LPatterns],Lmots).

match_pattern_dist([],_).
match_pattern_dist([N,Pattern|Lpatterns],Lmots) :-
    within_dist(N,Pattern,Lmots,Lmots_rem),
    match_pattern_dist(Lpatterns,Lmots_rem).

within_dist(_,Pattern,Lmots,Lmots_rem) :-
    prefixrem(Pattern,Lmots,Lmots_rem).
within_dist(N,Pattern,[_|Lmots],Lmots_rem) :-
    N > 1, Naux is N-1,
    within_dist(Naux,Pattern,Lmots,Lmots_rem).

sublist(SL,L) :-
    prefix(SL,L), !.
sublist(SL,[_|T]) :- sublist(SL,T).

sublistrem(SL,L,Lr) :-
    prefixrem(SL,L,Lr), !.
sublistrem(SL,[_|T],Lr) :- sublistrem(SL,T,Lr).

prefixrem([],L,L).
prefixrem([H|T],[H|L],Lr) :- prefixrem(T,L,Lr).



% ----------------------------------------------------------------%

nb_coureurs(3).
nb_equipes(4).

mclef(commence,10).
mclef(equipe,5).
mclef(quipe,5).
mclef(occupee,5).
mclef(occupe,5).
mclef(depasser,5).
mclef(chances,5).
mclef(chance,5).
mclef(interrogation,5).
mclef(crash,5).
mclef(cartes,5).
mclef(carte,5).
mclef(jouer,5).
mclef(gagner,5).
mclef(gagne,5).
mclef(gagn,5).
mclef(aspiration,5).

% --------------------------------------------------------------- %
%Qui commence
regle_rep(commence,1,
 [ qui, commence, le, jeu ],
 [ c,'\'',est, au, joueur, ayant, la, plus, haute, carte, secondes, de, commencer,'.' ] ).

% ----------------------------------------------------------------% 
%Combien de joueurs par equipe
regle_rep(equipe,5,
  [ [ combien ], 3, [ coureurs], 5, [ equipe ] ],
  [ chaque, equipe, compte, X, coureurs ]) :- 

       nb_coureurs(X).

regle_rep(quipe,5,
  [ [ combien ], 3, [ coureurs], 5, [ quipe ] ],
  [ "chaque equipe compte ", X_in_chars, "coureurs" ]) :- 

       nb_coureurs(X),
       write_to_chars(X,X_in_chars).

write_to_chars(3,"3 ").
% ----------------------------------------------------------------% 
%Puis-je deplacer un coureur sur une case occupee par un autre coureur

regle_rep(occupee,5,
 [ [deplacer],3,[coureur],3, [case],2, [occupee] ],
 [ "Non, une case ne peut etre occupee que par un seul joueur","." ] ). %double guillemet si maj pcq sinon il croit que c'est une variable

regle_rep(occupe,5,
 [ [deplacer],3,[coureur],3, [case],2, [occupe] ],
 [ "Non, une case ne peut etre occupee que par un seul joueur","." ] ).

% ----------------------------------------------------------------% 
%Puis-je depasser au-dessus d'un groupe de coureurs ?

regle_rep(depasser,5,
 [ [depasser],5,[autre],3,[joueur] ],
 [ "Oui", il, est, permis, de, depasser, par, le, bas,'-',cote, de, la, route, pour, autant, que, le, coureur, arrive, sur, une, case ,non, occupee,".",
 "Si", ce, n,'\'',est, pas, le, cas,",", le, coureur, chute, et, entraine, dans,sa, chute, le, groupe, de, coureurs, qu,'\'',il, voulait, depasser,"." ] ).

regle_rep(passer,5,
 [ [passer],5,[autre],3,[joueur] ],
 [ "Oui", il, est, permis, de, depasser, par, le, bas,'-',cote, de, la, route, pour, autant, que, le, coureur, arrive, sur, une, case ,non, occupee,".",
 "Si", ce, n,'\'',est, pas, le, cas,",", le, coureur, chute, et, entraine, dans,sa, chute, le, groupe, de, coureurs, qu,'\'',il, voulait, depasser,"." ] ).

% ----------------------------------------------------------------% 
%A quoi servent les cases chances ?

regle_rep(chances,5,
 [ [chances],5,[cases],2],
 [ "Les cases chances permettent de se deplacer jusqu",'\'', "a trois cases en avant ou en arriere","." ] ).

 regle_rep(chance,5,
 [ [chance],5,[case],2],
 [ "Les cases chances permettent de se deplacer jusqu,'\'', a trois cases en avant ou en arriere","." ] ).

% ----------------------------------------------------------------% 
%A quoi servent les cases "?" ?

regle_rep(interrogation,5,
 [ [interrogation],5,[point],2, [cases],2 ],
 [ "Ce sont des cases chances","." ] ).

% ----------------------------------------------------------------% 
%Crash ?

regle_rep(crash,5,
 [ [crash],5,[occupe] ],
 [ "Un crash arrive lorsque deux joeurs occupent la meme case","." ] ).

% ----------------------------------------------------------------% 
%A quoi servent les cartes ?

regle_rep(cartes,5,
 [ [cartes],5,[secondes],3 ],
 [ "Les cartes secondes servent a faire avancer un joueur","." ] ).

regle_rep(carte,5,
 [ [carte],5,[seconde],3 ],
 [ "Les cartes secondes servent a faire avancer un joueur","." ] ).

% ----------------------------------------------------------------% 
%Comment jouer au jeu ?
regle_rep(jouer,5,
 [ [jouer],5,[jeu],5 ],
[ "Une", fois, les, cartes, distribuees, ',', le, premier, joueur,',', choisit, une, de, ses, cartes, seconde, et, la, joue,".",
"Il", deplace, son, premier, coureur, du, nombre, de, secondes,'/',cases, correspondant, a, la, carte, seconde, jouee,".",
"Vous", pouvez, choisir, vous, '-', meme, l,'\'',allure, de, votre, coureur,".",
"Le", coureur, peut, se, deplacer, tout, droit, ou, en, diagonal, ',', mais, pas, sur, le, cote, ni, en, arriere,".",
"Vous", ne, pouvez, pas, finir, sur, une, case, deja, occupee,".",
'(', plus, d, '\'', informations, en, posant, la, question, '\'', qu, '\'', est,'-',ce, qu, '\'', un, crash,"." ] ).

% ----------------------------------------------------------------% 
%Comment gagner au jeu ?

regle_rep(gagner,5,
 [ [gagner],5,[jeu],2 ],
 [ "Le joueur qui a gagne est celui dont toute l",'\'',"equipe a atteint l",'\'',"arrivee tout en ayant fait moins de temps que les autres equipes","." ] ).

regle_rep(gagne,5,
 [ [gagner],5,[jeu],2 ],
 [ "Le joueur qui a gagne est celui dont toute l",'\'',"equipe a atteint l",'\'',"arrivee tout en ayant fait moins de temps que les autres equipes","." ] ).

regle_rep(gagn,5,
 [ [gagner],5,[jeu],2 ],
 [ "Le joueur qui a gagne est celui dont toute l",'\'',"equipe a atteint l",'\'',"arrivee tout en ayant fait moins de temps que les autres equipes","." ] ).

% ----------------------------------------------------------------% 
%A quoi sert le bouton aspiration ?

regle_rep(aspiration,5,
 [ [aspiration],5,[bouton],4 ],
 [ "Le bouton aspiration sert a augmenter son nombre de case de un si et seulement si la case desiree se finissait a cote", ',', "ou juste derriere", ',', "un autre joueur", ".",
 "Vous pouvez choisir de l", '\'', "utiliser ou non en fonction de si vous cliquez sur le bouton ou non",".",'(',"Vous pouvez voir son etat juste au",'-',"dessus",".",
 "Si vous voulez l",'\'',"utiliser son etat doit etre egal a true",',',"sinon a false",')', "." ] ).

% ----------------------------------------------------------------% 
%Je joue pour le 3e coureur de l'equipe d'Italie. Quelle carte secondes me conseillez-vous de jouer ?
%algo

/* --------------------------------------------------------------------- */
/*                                                                       */
/*          CONVERSION D'UNE QUESTION DE L'UTILISATEUR EN                */
/*                        LISTE DE MOTS                                  */
/*                                                                       */
/* --------------------------------------------------------------------- */

% lire_question(L_Mots)

lire_question(Input, LMots) :- read_atomics(Input, LMots).



/*****************************************************************************/
% my_char_type(+Char,?Type)
%    Char is an ASCII code.
%    Type is whitespace, punctuation, numeric, alphabetic, or special.

my_char_type(46,period) :- !.
my_char_type(X,alphanumeric) :- X >= 65, X =< 90, !.
my_char_type(X,alphanumeric) :- X >= 97, X =< 123, !.
my_char_type(X,alphanumeric) :- X >= 48, X =< 57, !.
my_char_type(X,whitespace) :- X =< 32, !.
my_char_type(X,punctuation) :- X >= 33, X =< 47, !.
my_char_type(X,punctuation) :- X >= 58, X =< 64, !.
my_char_type(X,punctuation) :- X >= 91, X =< 96, !.
my_char_type(X,punctuation) :- X >= 123, X =< 126, !.
my_char_type(_,special).


/*****************************************************************************/
% lower_case(+C,?L)
%   If ASCII code C is an upper-case letter, then L is the
%   corresponding lower-case letter. Otherwise L=C.

lower_case(X,Y) :-
    X >= 65,
    X =< 90,
    Y is X + 32, !.

lower_case(X,X).


/*****************************************************************************/
% read_lc_string(-String)
%  Reads a line of input into String as a list of ASCII codes,
%  with all capital letters changed to lower case.

read_lc_string(String) :-
    get0(FirstChar),
    lower_case(FirstChar,LChar),
    read_lc_string_aux(LChar,String).

    read_lc_string_aux(10,[]) :- !.  % end of line

read_lc_string_aux(-1,[]) :- !.  % end of file

read_lc_string_aux(LChar,[LChar|Rest]) :- read_lc_string(Rest).


/*****************************************************************************/
% extract_word(+String,-Rest,-Word) (final version)
%  Extracts the first Word from String; Rest is rest of String.
%  A word is a series of contiguous letters, or a series
%  of contiguous digits, or a single special character.
%  Assumes String does not begin with whitespace.

extract_word([C|Chars],Rest,[C|RestOfWord]) :-
    my_char_type(C,Type),
    extract_word_aux(Type,Chars,Rest,RestOfWord).

    extract_word_aux(special,Rest,Rest,[]) :- !.
% if Char is special, don't read more chars.

extract_word_aux(Type,[C|Chars],Rest,[C|RestOfWord]) :-
    my_char_type(C,Type), !,
extract_word_aux(Type,Chars,Rest,RestOfWord).

extract_word_aux(_,Rest,Rest,[]).   % if previous clause did not succeed.


/*****************************************************************************/
% remove_initial_blanks(+X,?Y)
%   Removes whitespace characters from the
%   beginning of string X, giving string Y.

remove_initial_blanks([C|Chars],Result) :-
    my_char_type(C,whitespace), !,
remove_initial_blanks(Chars,Result).

remove_initial_blanks(X,X).   % if previous clause did not succeed.


/*****************************************************************************/
% digit_value(?D,?V)
%  Where D is the ASCII code of a digit,
%  V is the corresponding number.

digit_value(48,0).
digit_value(49,1).
digit_value(50,2).
digit_value(51,3).
digit_value(52,4).
digit_value(53,5).
digit_value(54,6).
digit_value(55,7).
digit_value(56,8).
digit_value(57,9).


/*****************************************************************************/
% string_to_number(+S,-N)
%  Converts string S to the number that it
%  represents, e.g., "234" to 234.
%  Fails if S does not represent a nonnegative integer.

string_to_number(S,N) :-
    string_to_number_aux(S,0,N).

    string_to_number_aux([D|Digits],ValueSoFar,Result) :-
    digit_value(D,V),
    NewValueSoFar is 10*ValueSoFar + V,
string_to_number_aux(Digits,NewValueSoFar,Result).

string_to_number_aux([],Result,Result).


/*****************************************************************************/
% string_to_atomic(+String,-Atomic)
%  Converts String into the atom or number of
%  which it is the written representation.

string_to_atomic([C|Chars],Number) :-
	string_to_number([C|Chars],Number), !.

string_to_atomic(String,Atom) :- name(Atom,String).
  % assuming previous clause failed.


/*****************************************************************************/
% extract_atomics(+String,-ListOfAtomics) (second version)
%  Breaks String up into ListOfAtomics
%  e.g., " abc def  123 " into [abc,def,123].

extract_atomics(String,ListOfAtomics) :-
    remove_initial_blanks(String,NewString),
    extract_atomics_aux(NewString,ListOfAtomics).

extract_atomics_aux([C|Chars],[A|Atomics]) :-
    extract_word([C|Chars],Rest,Word),
    string_to_atomic(Word,A),       % <- this is the only change
    extract_atomics(Rest,Atomics).

extract_atomics_aux([],[]).


/*****************************************************************************/
% clean_string(+String,-Cleanstring)
%  removes all punctuation characters from String and return Cleanstring

clean_string([C|Chars],L) :-
    my_char_type(C,punctuation),
    clean_string(Chars,L), !.
clean_string([C|Chars],[C|L]) :-
    clean_string(Chars,L), !.
clean_string([C|[]],[]) :-
    my_char_type(C,punctuation), !.
clean_string([C|[]],[C]).


/*****************************************************************************/
% read_atomics(-ListOfAtomics)
%  Reads a line of input, removes all punctuation characters, and converts
%  it into a list of atomic terms, e.g., [this,is,an,example].

read_atomics(QuestionString, ListOfAtomics) :-
   writeln(QuestionString),
   string_codes(QuestionString, QuestionCodes),
   writeln(QuestionCodes),
	clean_string(QuestionCodes,Cleanstring),
   writeln(Cleanstring),
	extract_atomics(Cleanstring,ListOfAtomics),
   writeln(ListOfAtomics).



/* --------------------------------------------------------------------- */
/*                                                                       */
/*        PRODUIRE_REPONSE : ecrit la liste de strings                   */
/*                                                                       */
/* --------------------------------------------------------------------- */

ecrire_reponse(L) :-
   nl, write('QBot :'),
   ecrire_li_reponse(L,1,1).

% ecrire_li_reponse(Ll,M,E)
% input : Ll, liste de listes de mots (tout en minuscules)
%         M, indique si le premier caractere du premier mot de 
%            la premiere ligne doit etre mis en majuscule (1 si oui, 0 si non)
%         E, indique le nombre d'espaces avant ce premier mot 

ecrire_li_reponse([],_,_) :- 
    nl.

ecrire_li_reponse([Li|Lls],Mi,Ei) :- 
   ecrire_ligne(Li,Mi,Ei,Mf),
   ecrire_li_reponse(Lls,Mf,2).

% ecrire_ligne(Li,Mi,Ei,Mf)
% input : Li, liste de mots a ecrire
%         Mi, Ei booleens tels que decrits ci-dessus
% output : Mf, booleen tel que decrit ci-dessus a appliquer 
%          a la ligne suivante, si elle existe

ecrire_ligne([],M,_,M) :- 
   nl.

ecrire_ligne([M|L],Mi,Ei,Mf) :-
   ecrire_mot(M,Mi,Maux,Ei,Eaux),
   ecrire_ligne(L,Maux,Eaux,Mf).

% ecrire_mot(M,B1,B2,E1,E2)
% input : M, le mot a ecrire
%         B1, indique s'il faut une majuscule (1 si oui, 0 si non)
%         E1, indique s'il faut un espace avant le mot (1 si oui, 0 si non)
% output : B2, indique si le mot suivant prend une majuscule
%          E2, indique si le mot suivant doit etre precede d'un espace

ecrire_mot('.',_,1,_,1) :-
   write('. '), !.
ecrire_mot('\'',X,X,_,0) :-
   write('\''), !.
ecrire_mot(',',X,X,E,1) :-
   espace(E), write(','), !.
ecrire_mot(M,0,0,E,1) :-
   espace(E), write(M).
ecrire_mot(M,1,0,E,1) :-
   name(M,[C|L]),
   D is C - 32,
   name(N,[D|L]),
   espace(E), write(N).

espace(0).
espace(N) :- N>0, Nn is N-1, write(' '), espace(Nn).


/* --------------------------------------------------------------------- */
/*                                                                       */
/*                            TEST DE FIN                                */
/*                                                                       */
/* --------------------------------------------------------------------- */

fin(L) :- member(fin,L).

/* --------------------------------------------------------------------- */
/*                                                                       */
/*                         BOUCLE PRINCIPALE                             */
/*                                                                       */
/* --------------------------------------------------------------------- */

tourdefrance :- 

   nl, nl, nl,
   write('Salut, je suis QBot, je reponds a vos questions sur le jeu Tourdefrance.'), nl,
   write('Que puis-je faire pour vous ?'), 
   nl, nl, 

   repeat,
      write('Vous : '), ttyflush,
      lire_question(L_Mots),
      produire_reponse(L_Mots,L_ligne_reponse),
      ecrire_reponse(L_ligne_reponse),
   fin(L_Mots), !.


/* --------------------------------------------------------------------- */
/*                                                                       */
/*             ACTIVATION DU PROGRAMME APRES COMPILATION                 */
/*                                                                       */
/* --------------------------------------------------------------------- */

%:- tourdefrance.


:- start_server.


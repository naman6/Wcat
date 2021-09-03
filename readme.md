.................... WCAT ............................

This project includes wcat commands, based on cat commands of linux, I have made clone of cat commands in which manipulation with files and its content is done.

node index.js -r a.txt
*wcat* is added to package.json file and to your environment variables using #!/usr/bin/env node so from now we can use *wcat* instead of *node index.js*

ALL WCAT COMMANDS INCLUDED

wcat filename1 filename2 filename3
read all the files and display the content of all the files mentioned.

wcat -rs filename1 filename2
remove all the spaces in the file and then print it, from all the files mentioned.

wcat -rn filename1 filename2
remove new line from file, from all the files mentioned.

wcat -rmsc filename1 filename2
remove all special characters except A-Za-z, from all the files mentioned.

wcat -rsc filename1 .'&'
remove secondary character given after dot(.) identifier, all the '&' character will be removed from the files mentioned.

wcat -s filename1
add sequence of 1,2,3,...,n where n is the number of lines, from all the files mentioned.

wcat -sn filename1
add sequence of 1,2,3,...,n where n is the number of lines only for non empty lines, from all the files mentioned.

wcat -rel filename1
remove all the extra lines, from all the files mentioned.

wcat (dest file) -w (src file)
fileDest -w fileSrc - write the content of fileSrc into fileDest

wcat (dest file) -a (src file)
fileDest -a fileSrc - append the content of fileSrc into fileDest

wcat -relmod filename1
keeps only one empty line, removes all the other extra lines present from all the files mentioned.
#!/usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let arg of arguments){
    if(arg[0] == "-"){
        flags.push(arg);
    }else if(arg[0] == "."){
        secondaryArguments.push(arg.slice(1));    
    }else{
        filenames.push(arg);
    }
}
console.log(flags);

// ALL THE WCAT COMMANDS - for reference 
// 1. wcat filename1 filename2 filename3 - read all the files and display their content.
// 2. wcat -rs filename1 filename2 - remove all the spaces in the file and then print it.
// 3. wcat -rn filename1 filename2 - remove new line from file.
// 4. wcat -rmsc filename1 filename2 - remove all special characters except A-Za-z.
// 5. wcat -rsc filename1 .'&' - remove secondary character given after dot(.) identifier, all the '&' character will be removed from the files mentioned.
// 6. wcat -s filename1 - add sequence of 1,2,3,...,n where n is the number of lines.
// 7. wcat -sn filename1 - add sequence of 1,2,3,...,n where n is the number of lines only for non empty lines.
// 8. wcat -rel filename1 - remove all the extra lines.
// 9. wcat (dest file) -w (src file), fileDest -w fileSrc - write the content of fileSrc into fileDest
// 10. wcat (dest file) -a (src file), fileDest -a fileSrc - append the content of fileSrc into fileDest
// 11. wcat -relmod filename1 - keeps only one empty line, removes all the other extra lines present.

if(flags.length == 0 && filenames.length !=0){
    for(let file of filenames){
        console.log(fs.readFileSync(file, "utf-8"));
    }
}

if(flags.includes('-w') || flags.includes('-a')){
    let destFile = filenames[0];
    let srcFile = filenames[1];
    let content = fs.readFileSync(srcFile);
    if(flags.includes('-a') && fs.existsSync(destFile)){
        fs.appendFileSync(destFile, content);
    }else{
        fs.writeFileSync(destFile, content);
    }
    return;
}
function removeAll(fileData, ch){
    fileData = fileData.split(ch).join("");
    return fileData;

}
function addSequence(fileData){

    fileData = fileData.split("\n");
    let i = 1;
    let ans = "";
    for(let data of fileData){
        ans += i + "." + data +"\n";
        i++;
    }
    return ans;
}
function addSequenceToNonEmptyLines(fileData){
    fileData = removeAll(fileData, "\r");
    console.log(fileData.split("\n"));
    fileData = fileData.split("\n");  


    let i = 1;
    let ans = "";
    for(let data of fileData){
        if(data.length != 0 && data!='\r'){
            ans += i + "." + data +"\n";
            i++;
        }else{
            ans+="\n";
        }
    }

    return ans;
}
function removeAllExtraLines(fileData){
    fileData = removeAll(fileData, "\r");
    fileData = fileData.split("\n");
    
    dataArray = []
    for(let data of fileData){
        if(data.length != 0){
            dataArray.push(data);
        }
    }
    
    let content = dataArray.join("\n");
    
    return content;
}

function removeExtraLines(fileData){
    fileData = removeAll(fileData, "\r");
    fileData = fileData.split("\n");  
    console.log(fileData);

    let data = [];
    for(let i=1;i<fileData.length;i++){
        if(fileData[i] == ""  && fileData[i-1] == ""){
            fileData[i] = null;
        }
        if(fileData[i] == "" && fileData[i-1]==null){
            fileData[i] = null;
        }
    }
    for(let i=0;i<fileData.length;i++){
        if(fileData[i]!=null){
            data.push(fileData[i]);
        }
    }
    return data.join("\n");
}
for(let file of filenames){
    let fileData = fs.readFileSync(file, "utf-8");
    for(let flag of flags){
        if(flag == "-rs"){
            fileData = removeAll(fileData, " ");
        }
        if(flag == "-rn"){
            fileData = removeAll(fileData, "\r\n");
        }
        if(flag == "-rmsc"){
            let tempString = "";
            for(let character of fileData){
                let str = character.charCodeAt(0);
                if((str >= 65 && str<=90) || (str>=97 && str<=122)){
                    tempString += character;
                }
                fileData = tempString;
            }
        }
        if(flag == "-rsc"){
            for(let secondaryArgument of secondaryArguments){
                fileData = removeAll(fileData, secondaryArgument);
            }
        }
        if(flag == "-s"){
            fileData = addSequence(fileData);
        }
        if(flag == "-sn"){
            fileData = addSequenceToNonEmptyLines(fileData);
        }
        if(flag == "-rel"){
            fileData = removeAllExtraLines(fileData);
        }
        if(flag == "-relmod"){
            fileData = removeExtraLines(fileData);
        }
    }
    console.log(fileData);
}
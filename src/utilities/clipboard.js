export default function writeToClipboard(txt){
    if (!navigator.clipboard) {
        try {
            try{
                //Mozilla support
                document.execCommand("copy", txt)
            }
            catch{
                document.execCommand("copy",false,txt)
            }
        }
        catch (err){
            console.log(err)
        }
        return
    }
    else{
        navigator.clipboard.writeText(txt).then(function() {
        }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        return
    }
}

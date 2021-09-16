/**
 * Generates a random code for the game.
 */
export default function genRandomCode() : string {
    let characters = "abcdefghijklmnopqrstuvwxyz";
    let charactersLength : number = 26;
    let codeLength : number = 5;

    let result : string = '';
    for ( var i = 0; i < codeLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

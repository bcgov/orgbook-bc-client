export function claimFormat(claim: string):string{
    const splitted = claim.split("_")
    const cleanString = splitted.join(" ");
    return cleanString.charAt(0).toUpperCase() + cleanString.slice(1)
}
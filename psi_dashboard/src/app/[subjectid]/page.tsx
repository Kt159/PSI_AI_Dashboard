export default function Subjectid({params}: {
    params : {subjectid : string}
})
    {
    return <h1>{'Subject ID ' + params.subjectid}</h1>
}

export const TextMessage = (props)=>{
    const {text} = props
    return (
        <p>{(text.length>0)?text: 'Type min 3 Characters to search GIT users!!!'}</p>
    )
}
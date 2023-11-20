const SetSelectElement = (props) => {
    return (
        <div className='SetSelectElement'>
            <img src={props.set.image} alt={props.set.name}></img>
            <p>{props.set.name}</p>
        </div>
    );
}

export default SetSelectElement
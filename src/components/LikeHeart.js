import React from "react";

const LikeHeart = (props, movie) => {

    const changeHeart = () => {
        let classes = "fa fa-heart";
        if (!props.liked) {
            classes += "-o";
        }
        return classes;
    }
    return(
        <React.Fragment>
         <i onClick={props.onClick} style={{cursor: 'pointer'}} className={changeHeart()}></i>
        </React.Fragment>
    );
}
export default LikeHeart;

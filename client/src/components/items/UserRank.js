import React from 'react';

function UserRank(props) {
    let end = "";
    let dig = props.rank % 10;
    if (dig == 1)
        end = "st";
    else if (dig == 2)
        end = "nd";
    else if (dig == 3)
        end = "rd";
    else
        end = "th";
    let place = props.rank.toString() + end;
    return (
        <strong id="userRank">{place}</strong>
    )
}

export default UserRank;
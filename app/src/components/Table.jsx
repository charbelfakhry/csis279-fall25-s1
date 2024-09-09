import React from "react";


const Table = () => {

    const fillData = () => {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push({
                user_id: `id ${i}`,
                user_name: `name ${i}`,
                user_country: `LEB`
            });
        }
        return arr;
    }

    return (
        <table className="table table-dark">

            <thead>
                <tr>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                    <th>Country</th>
                </tr>

            </thead>

            <tbody>
                {
                    fillData().map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.user_id}</td>
                                <td>{item.user_name}</td>
                                <td>{item.user_country}</td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    )
}

export default Table;
import React from "react";

class SelectCourse extends React.Component {

    render() {
        return(
            <label>
                Course:
                <select value={this.props.course} onChange={this.props.handleCourseSelect}>
                    <option value="">Any</option>
                    <option value="Grupa Mica">Small Class</option>
                    <option value="Grupa Mijlocie">Medium Class</option>
                    <option value="Grupa Mare">Big Class</option>
                </select>
            </label>
        )
    }

}

export default SelectCourse;


import React, { Component } from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            imgUrl: "http://i.imgflip.com/1bij.jpg",
            img: [],
            topText: "",
            bottomText: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ img: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        let index = Math.floor(Math.random() * this.state.img.length)
        let randomImg = this.state.img[index]
        this.setState({ imgUrl: randomImg.url })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type="textbox"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type="textbox"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <h2 className="top">{this.state.topText}</h2>
                    <img alt="Problem?" src={this.state.imgUrl} />
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator

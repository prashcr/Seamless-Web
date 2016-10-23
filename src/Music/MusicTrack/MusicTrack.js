MusicTrack({
    artwork: '',
    stream: '',
    id: '',
    title: '',
    playTrack() {
        console.log(this.stream());

        let audio = $("#audioPlayer");
        audio.attr("src", this.stream());
        audio[0].pause();
        audio[0].load();
        audio[0].oncanplaythrough = audio[0].play();
    },
    rendered() {
        let self = this;
        setTimeout(() => {
            $(`#${self.id()}`).css({
                opacity: 1,
                "-webkit-transform": "scale(1)",
                "transform": "scale(1)",
                "-webkit-transition": ".3s",
                "transition": ".3s"
            })
        }, Math.floor(Math.random() * 500));
        $.StartScreen();
    },
    render() {
        <div id={this.id()} class="tile bg-blue fg-white" b="click: playTrack">
            <div class="tile-content">
                <div class="image-container">
                    <div class="frame">
                        <img src={this.artwork()}/>
                    </div>
                    <div class="image-overlay">
                        {this.title()}
                    </div>
                </div>
            </div>
        </div>
    }
});

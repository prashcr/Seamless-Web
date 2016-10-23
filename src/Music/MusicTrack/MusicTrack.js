MusicTrack({
  artwork: '',
  stream: '',
  id: '',
  title: '',
  playTrack() {
    console.log(this.artwork());
  },
  rendered() {
    let self = this;
      $(`#${self.id()}`).css({
          opacity: 1,
          "-webkit-transform": "scale(1)",
          "transform": "scale(1)",
          "-webkit-transition": ".3s",
          "transition": ".3s"
      });
  },
  render() {
    <div id={this.id()} class="tile bg-blue fg-white" b="click: playTrack">
      <div class="tile-content">
        <div class="image-container">
            <div class="frame">
              <img src={this.artwork()} />
            </div>
            <div class="image-overlay">
                {this.title()}
            </div>
        </div>
      </div>
  </div>
  }
});

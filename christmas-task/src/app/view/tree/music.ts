class Music {
  _music: HTMLAudioElement;
  isMusicPlay: boolean;

  constructor() {
    this._music = new Audio();
    this._music.src = '../../assets/audio/audio.mp3';
    this.isMusicPlay = true;
    this._music.currentTime = 0;
    this._music.volume = 1;
  }  

  playMusic() {
    if (!this.isMusicPlay) {
      this._music.pause();
    } else {
      this._music.play();
      this._music.onended = () => {
        this._music.currentTime = 0;
        this._music.play();
      };
    }   
  }
}

export default new Music();
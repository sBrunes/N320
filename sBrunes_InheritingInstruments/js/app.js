//current instrument index in the sequence
currentInstrument = 0;

//synth objects for the trebble notes and bass notes
let synthObject = new Tone.Synth().toDestination();
let bassSynth1 = new Tone.Synth().toDestination();
let bassSynth2 = new Tone.Synth().toDestination();

//array of the synths
let synths = [synthObject, bassSynth1, bassSynth2];

//variable to stop the Timout
var timer;

//current place in moonlight sonata
count = 0;

//Class that the other instruments inherit from
class Instrument
{
    loudness
    family
    playVerb
    duration
    note
    synthIndex

    //Assigns the variables
    constructor(note, loudness, family, playVerb, synthIndex)
    {
        this.note = note;
        this.loudness = loudness;
        this.family = family;
        this.playVerb = playVerb;
        this.synthIndex = synthIndex;
    }

    //plays the note on the specified synth object for a duration of time
    Play(duration)
    {
        //sets the volume
        synths[this.synthIndex].volume.value = this.loudness;

        //sets the duration
        this.duration = duration;

        //says which instrument plays at its loudness
        console.log(this.family + " " + this.playVerb + " at " + this.loudness);

        //plays the note for the duration
        synths[this.synthIndex].triggerAttackRelease(this.note, duration)
    }
}

//woodwind class
class Woodwind extends Instrument
{
    constructor(note, loudness)
    {
        super(note, loudness, "Woodwind", "blows", 0);
    }
}

//percussion class
class Percussion extends Instrument
{
    constructor(note, loudness)
    {
        super(note, loudness, "Percussion", "beats", 0);
    }
}

//string class
class String extends Instrument
{
    constructor(note, loudness)
    {
        super(note, loudness, "String", "performs", 0);
    }
}

//piano class for moonlight sonata
class Piano extends Instrument
{
    constructor(note, loudness, synthIndex)
    {
        super(note, loudness, "Piano", "plays", synthIndex);
    }
}

//variable for the musical instruments
var musicalInstruments = [];
musicalInstruments[0] = new Woodwind("C4", -12);
musicalInstruments[1] = new Percussion("D5", -12);
musicalInstruments[2] = new String("A#4", -12);

//Array with all of the trebble notes in order from moonlight sonata
var TrebbleNotes1 = [];
TrebbleNotes1[0] = new Piano("G#3", -12, 0);
TrebbleNotes1[1] = new Piano("C#4", -12, 0);
TrebbleNotes1[2] = new Piano("E4", -12, 0);
TrebbleNotes1[3] = new Piano("A3", -10, 0);
TrebbleNotes1[4] = new Piano("C#4", -12, 0);
TrebbleNotes1[5] = new Piano("E4", -12, 0);
TrebbleNotes1[6] = new Piano("A3", -10, 0);
TrebbleNotes1[7] = new Piano("D4", -12, 0);
TrebbleNotes1[8] = new Piano("F#4", -12, 0);
TrebbleNotes1[9] = new Piano("G#3", -10, 0);
TrebbleNotes1[10] = new Piano("C4", -12, 0);
TrebbleNotes1[11] = new Piano("F#4", -12, 0);
TrebbleNotes1[12] = new Piano("G#3", -10, 0);
TrebbleNotes1[13] = new Piano("C#4", -12, 0);
TrebbleNotes1[14] = new Piano("E4", -12, 0);
TrebbleNotes1[15] = new Piano("G#3", -10, 0);
TrebbleNotes1[16] = new Piano("C#4", -12, 0);
TrebbleNotes1[17] = new Piano("D#4", -12, 0);
TrebbleNotes1[18] = new Piano("F#3", -10, 0);
TrebbleNotes1[19] = new Piano("C4", -12, 0);
TrebbleNotes1[20] = new Piano("D#4", -12, 0);
TrebbleNotes1[21] = new Piano("E3", -12, 0);

//arrays for both bass notes
var BassNotes1 = [];
var BassNotes2 = [];

//all bass notes in order in moonlight sonata
BassNotes1[0] = new Piano("C#4", -25, 1);
BassNotes2[0] = new Piano("C#3", -25, 2);
BassNotes1[1] = new Piano("B#3", -25, 1);
BassNotes2[1] = new Piano("B#2", -25, 2);
BassNotes1[2] = new Piano("A#3", -25, 1);
BassNotes2[2] = new Piano("A#2", -25, 2);
BassNotes1[3] = new Piano("F#3", -25, 1);
BassNotes2[3] = new Piano("F#2", -25, 2);
BassNotes1[4] = new Piano("C#4", -25, 1);
BassNotes2[4] = new Piano("C#3", -25, 2);
BassNotes1[5] = new Piano("G#4", -25, 1);
BassNotes2[5] = new Piano("G#3", -25, 2);
BassNotes1[6] = new Piano("C#2", -12, 1);
BassNotes2[6] = new Piano("G#2", -12, 2);

//offset for the treble notes in moonlight sonata
var offset = 0;

//To manage when the songs are played and restart them if necessary
function MusicManager(playAssignment)
{
    //play the assignment
    if(playAssignment)
    {
        //end the timout if the button is pressed again
        if(timer != null)
        {
            clearTimeout(timer);
        } 

        //reset variables
        currentInstrument = 0;

        //starts the timout function
        PlayNext();
    } else {
        //play moonlight sonata

        //end the timout if the button is pressed again
        if(timer != null)
        {
            clearTimeout(timer);
        } 

        //reset variables
        currentInstrument = 0;
        count = 0;
        offset = 0;

        //starts the timout function
        MoonlightSonata1();
    }
}

//function to play the musical instruments in order
function PlayNext()
{
    //plays the instrument
    musicalInstruments[currentInstrument].Play(.5);

    //sets a new timer
    timer = setTimeout(this.PlayNext.bind(this), musicalInstruments[currentInstrument].duration * 1000);

    //reset current instrument if it is 2
    if(currentInstrument == 2)
    {
        currentInstrument = 0;
    } else {
        currentInstrument++;
    }
}

//function to play moonlight sonata
function MoonlightSonata1()
{
    //plays the trebble note
    TrebbleNotes1[currentInstrument].Play(.4);

    //plays the bass combo if at the appropriate section
    if(count == 0)
    {
        Bass(0, 3.6);
    } else if(count == 12)
    {
        Bass(1, 3.6);
    } else if(count == 24)
    {
        Bass(2, 2.4);
    } else if(count == 30)
    {
        Bass(3, 2.4);
    } else if(count == 36)
    {
        Bass(4, 2.4);
    } else if(count == 42)
    {
        Bass(4, 2.4);
    } else if(count == 48)
    {
        Bass(5, .8);
    }

    //sets a new timer
    timer = setTimeout(this.MoonlightSonata1.bind(this), TrebbleNotes1[currentInstrument].duration * 1000);

    //changes the offset so the trebble notes can repeat at proper positions
    if(count == 22) {
        offset = 3;
    } else if(count == 28){
        offset = 6;
    }

    //since there is no repeating in the final part, play all the final notes of the array in order
    if(count < 34)
    {
        //repeats certain parts of the trebble notes based on the offset
        if(currentInstrument == 2 + offset)
        {
            currentInstrument = offset;
        } else {
            currentInstrument++;
        }
    } else {
        //increment current instrument to repeat trebble notes
        currentInstrument++;
    }
    
    //stop timeout if the song is done
    if(count == 48)
    {
        clearTimeout(timer);
    }

    //increment count
    count++;
}

//Plays both of the bass notes for a selected duration
function Bass(section, duration)
{
    //plays the notes
    BassNotes1[section].Play(duration);
    BassNotes2[section].Play(duration);
}

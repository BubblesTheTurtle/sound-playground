import { useState, useEffect } from 'react';
import { Oscillator, Destination } from 'tone'
import { Slider, Input, Grid, InputAdornment, Button } from '@material-ui/core'
import FunctionPlot from './FunctionPlot'
 

import styles from '../../styles/PureTone.module.css'


export default function PureTone() {
    const [amplitude, setAmplitude] = useState(1);
    const [frequency, setFrequency] = useState(440);
    const [play, setPlay] = useState(false);
    const [ocs, setOcs] = useState(null);
    
    
    const handleBlur = () => {
        if (frequency < 0) {
          setFrequency(10);
        } else if (frequency > (10 ** 4.5)) {
          setFrequency(10 ** 4.5);
        }
    };

    useEffect(() => {
        const newOsc = new Oscillator(frequency, "sine").toDestination();
        setOcs(newOsc);
    }, []); 

    useEffect(() => {
        if (ocs) {
            if (play) {
                ocs.start()
            }
            else {
                ocs.stop()
            }
        }
    }, [play]);

    useEffect(() => {
        if (ocs) {
            ocs.frequency.value = frequency;
        }
    }, [frequency])

    useEffect(() => {
        if (ocs) {
            ocs.volume.value = 20*Math.log(amplitude)/Math.log(2);
        }
    }, [amplitude])

    const handlePlay = (e) => {
        setPlay(!play);
    }

    return (<div className={styles.card}>
        <h1>Pure Tones</h1>
        <p>Pure tones are sound waves that follow a sinusoidal pattern. You may remember hearing them during hearing tests.</p>
        <FunctionPlot options={{xAxis: {domain: [0, 4 / frequency]}, yAxis: {domain: [-2, 2]}, data: [{fn: `${amplitude} * sin(${frequency}*2*PI*x)`}]}}/>
        <Grid className={styles.inputPair} container spacing={2}>
            <Grid item>
                Frequency: 
            </Grid>
            <Grid item xs>
                <Input                   
                    value={Math.round(frequency)}
                    onChange={event => setFrequency(event.target.value === '' ? '' : Number(event.target.value))}
                    onBlur={handleBlur}
                    inputProps={{
                    step: 0.001,
                    min: 10,
                    max: 10 ** 4.5,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                    endAdornment={<InputAdornment position="end">Hz</InputAdornment>}
                /> 
            </Grid>
            <Grid item className={styles.slider}>
            <Slider
                value={Math.log(frequency)/Math.log(10)}
                onChange={(e, newVal) => {setFrequency(10 ** newVal)}}
                min={1}
                max={4.5}
                step={0.0001}
                scale={(x) => x ** 10}
            />
            </Grid>
        </Grid>
        <Grid className={styles.inputPair} container spacing={2}>
            <Grid item>
                Amplitude: 
            </Grid>
            <Grid item xs>
                <Input
                    value={amplitude}
                    onChange={event => setAmplitude(event.target.value === '' ? '' : Number(event.target.value))}
                    onBlur={() => {
                        if (amplitude < 0)  {
                            setAmplitude(0);
                        }
                        else if (amplitude > 1) {
                            setAmplitude(1);
                        }
                    }}
                    inputProps={{
                    step: 0.0001,
                    min: 0,
                    max: 1,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                /> 
            </Grid>
            <Grid item className={styles.slider}>
                <Slider min={0} max={1} step={0.0001} value={amplitude} onChange={(e, newVal) => {setAmplitude(newVal)}} />
            </Grid>
            
        </Grid>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handlePlay}>
                {!play ? "Play" : "Stop"}
        </Button>

    </div>)
}

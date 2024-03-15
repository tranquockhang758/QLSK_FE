window.onload = function() {
 
    const zero = 'https://audio.hpcdongnai.vn/audios/0.mp3';
    const one = 'https://audio.hpcdongnai.vn/audios/1.mp3';
    const two = 'https://audio.hpcdongnai.vn/audios/2.mp3';
    const three = 'https://audio.hpcdongnai.vn/audios/3.mp3';
    const four = 'https://audio.hpcdongnai.vn/audios/4.mp3';
    const five = 'https://audio.hpcdongnai.vn/audios/5.mp3';
    const six = 'https://audio.hpcdongnai.vn/audios/6.mp3';
    const seven = 'https://audio.hpcdongnai.vn/audios/7.mp3';
    const eight = 'https://audio.hpcdongnai.vn/audios/8.mp3';
    const nine = 'https://audio.hpcdongnai.vn/audios/9.mp3';
    const ten = 'https://audio.hpcdongnai.vn/audios/10.mp3';
    const tram = 'https://audio.hpcdongnai.vn/audios/00.mp3';
    const nghin = 'https://audio.hpcdongnai.vn/audios/000.mp3';
    const muoi = 'https://audio.hpcdongnai.vn/audios/muoi.mp3';
    const le = 'https://audio.hpcdongnai.vn/audios/le.mp3';
    const mot = 'https://audio.hpcdongnai.vn/audios/mot.mp3';
    const dot = 'https://audio.hpcdongnai.vn/audios/dot.mp3';
    const xin_chao = 'https://audio.hpcdongnai.vn/audios/xin-chao.mp3';
    const mw = 'https://audio.hpcdongnai.vn/audios/mw.mp3';
    const mvar = 'https://audio.hpcdongnai.vn/audios/mvar.mp3';
    const unknown = 'https://audio.hpcdongnai.vn/audios/unknown.mp3';
    const whoami = 'https://audio.hpcdongnai.vn/audios/whoami.mp3';
    const thankyou = 'https://audio.hpcdongnai.vn/audios/thankyou.mp3';
    const violate_our_term = 'https://audio.hpcdongnai.vn/audios/violate-our-term.mp3';
    
    var voiceSearch;
    var LCU_DN3, LCU1_DN3, LCU2_DN3, LCU3_DN3, LCU4_DN3, LCU5_DN3, LCU6_DN3;
    var LCU_DN4, LCU1_DN4, LCU2_DN4, LCU3_DN4, LCU4_DN4, LCU5_DN4, LCU6_DN4;
    // Assitant
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const synth = window.speechSynthesis;
    recognition.lang = 'vi-VI';
    recognition.continuous = false;
    const microphone = document.querySelector('.microphone');

    const speak = (text) => {
        if (synth.speaking) {
            console.error('Busy. Speaking...');
            return;
        }
        const utter = new SpeechSynthesisUtterance(text);
        utter.onend = () => { console.log('SpeechSynthesisUtterance.onend'); }
        utter.onerror = (err) => { console.error('SpeechSynthesisUtterance.onerror', err); }
        synth.speak(utter);
    };
    
    microphone.addEventListener('click', (e) => { e.preventDefault(); recognition.start(); microphone.classList.add('recording'); });
    recognition.onspeechend = () => { recognition.stop(); microphone.classList.remove('recording'); }
    recognition.onerror = (err) => { console.error(err); microphone.classList.remove('recording'); }

    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        // console.log("text: ",  toSlug(text));
        console.log("text: ",  text);
        handleJob(text);
    }
 

    playAudio=(url)=>{return new Promise(res=>{var audio=new Audio(url);audio.play();audio.onended=res})}
    playAudioNumber=a=>new Promise(c=>{switch(a){case 0:d=zero;break;case 1:d=one;break;case 2:d=two;break;case 3:d=three;break;case 4:d=four;break;case 5:d=five;break;case 6:d=six;break;case 7:d=seven;break;case 8:d=eight;break;case 9:d=nine;break;case 10:d=ten;break;case 11:d=tram;break;case 12:d=nghin;break;case 13:d=muoi;break;case 14:d=le;break;case 15:d=mot;break;case 16:d=dot;break;default:console.log("nothing")}var d,b=new Audio(d);b.play(),b.onended=c})
    async function numberToVoice(a){if(a%1==0)await speakNum(a);else{let b=parseInt(((a=a.toFixed(3))+"").split(".")[0]),c=parseInt((a+"").split(".")[1]);await speakNum(b),await playAudioNumber(16),await speakNum(c)}}
    async function speakNum(e){var d=e.toString().split("").map(Number),g=d.length;switch(g){case 1:await playAudioNumber(e);break;case 2:var a=d[0],b=d[1];e%10==0?1==a?await playAudioNumber(10):(await playAudioNumber(a),await playAudioNumber(13)):e<20?(await playAudioNumber(10),await playAudioNumber(b)):(await playAudioNumber(a),await playAudioNumber(13),1==b?await playAudioNumber(15):await playAudioNumber(b));break;case 3:var c=d[0],a=d[1],b=d[2];e%100==0?(await playAudioNumber(c),await playAudioNumber(11)):0==a&&0!=b?(await playAudioNumber(c),await playAudioNumber(11),await playAudioNumber(14),await playAudioNumber(b)):e%10==0?(await playAudioNumber(c),await playAudioNumber(11),1==a?await playAudioNumber(10):(await playAudioNumber(a),await playAudioNumber(13))):(await playAudioNumber(c),await playAudioNumber(11),1==a?await playAudioNumber(10):(await playAudioNumber(a),await playAudioNumber(13)),1==b?await playAudioNumber(15):await playAudioNumber(b));break;case 4:var f=d[0],c=d[1],a=d[2],b=d[3];if(e%1e3==0)await playAudioNumber(f),await playAudioNumber(12);else if(0==c&&0==a)await playAudioNumber(f),await playAudioNumber(12),await playAudioNumber(14),await playAudioNumber(b);else if(0==c&&0!=a)await playAudioNumber(f),await playAudioNumber(12),await playAudioNumber(0),await playAudioNumber(11),10*a+b<20?(await playAudioNumber(10),await playAudioNumber(b)):(await playAudioNumber(a),await playAudioNumber(13),1==b?await playAudioNumber(15):await playAudioNumber(b));else{var h=100*c+10*a+b;await playAudioNumber(f),await playAudioNumber(12),h%100==0?(await playAudioNumber(c),await playAudioNumber(11)):0==a&&0!=b?(await playAudioNumber(c),await playAudioNumber(11),await playAudioNumber(14),await playAudioNumber(b)):e%10==0?(await playAudioNumber(c),await playAudioNumber(11),1==a?await playAudioNumber(10):(await playAudioNumber(a),await playAudioNumber(13))):(await playAudioNumber(c),await playAudioNumber(11),1==a?await playAudioNumber(10):(await playAudioNumber(a),await playAudioNumber(13)),1==b?await playAudioNumber(15):await playAudioNumber(b))}break;default:console.log("nothing")}}
    function toSlug(a){return a=(a=(a=(a=(a=(a=(a=(a=(a=(a=(a=(a=(a=a.toLowerCase()).replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g,"a")).replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g,"e")).replace(/(ì|í|ị|ỉ|ĩ)/g,"i")).replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g,"o")).replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g,"u")).replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g,"y")).replace(/(đ)/g,"d")).replace(/([^0-9a-z-\s])/g,"")).replace(/(\s+)/g,"-")).replace(/-+/g,"-")).replace(/^-+/g,"")).replace(/-+$/g,"")}
    
    searchVoiceText = (text) =>{
        return new Promise((resolve,reject)=>{
            var form = new FormData();
            var settings = {
            // "url": "https://server.hpcdongnai.vn/?mod=VoiceText&controller=VoiceText&action=searchVoiceText&accountID=61081834359689812168&tocken=mr01neVVeL0dxLMEZIMl&voiceText=" + toSlug(text),
            "url": "http://localhost/server/?mod=VoiceText&controller=VoiceText&action=searchVoiceText&accountID=61081834359689812168&tocken=mr01neVVeL0dxLMEZIMl&voiceText=" + toSlug(text),
            "method": "GET",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
            };
            
            $.ajax(settings).done(function (response) {
                voiceSearch = JSON.parse(response)?.result[0]?.meaning || '';
                return resolve('');
            });
        });
      }

      getLcuDN4 = (text) =>{
        return new Promise((resolve,reject)=>{
            var form = new FormData();
            var settings = {
            "url": "https://server.hpcdongnai.vn/?mod=OCC&controller=OCC&action=getOCCDN4&accountID=61081834359689812168&tocken=mr01neVVeL0dxLMEZIMl",
            "method": "GET",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
            };
            
            $.ajax(settings).done(function (response) {
                // voiceSearch = JSON.parse(response)?.result[0]?.meaning || ''; LcuData
                console.log(JSON.parse(response)?.result[0]);
                LCU_DN4 = JSON.parse(response)?.result[0];
                LCU1_DN4 = JSON.parse(LCU_DN4.LCU1);
                LCU2_DN4 = JSON.parse(LCU_DN4.LCU2);
                LCU3_DN4 = JSON.parse(LCU_DN4.LCU3);
                LCU4_DN4 = JSON.parse(LCU_DN4.LCU4);
                LCU5_DN4 = JSON.parse(LCU_DN4.LCU5);
                LCU6_DN4 = JSON.parse(LCU_DN4.LCU6);
                return resolve('');
            });

        });
      }

    async function handleJob(text){ 
        await searchVoiceText(text);
        if(text.indexOf("**")>-1){voiceSearch = 'violate_our_term';} // filter out the wasted people
        console.log("voiceSearch",voiceSearch)
        switch (voiceSearch) {
            case "xin-chao":
            await playAudio(xin_chao);
            break;
            case "ban-la-ai":
                await playAudio(whoami);
                break;
            case "xin-cam-on":
                await playAudio(thankyou);
                break;
            case "violate_our_term":
                await playAudio(violate_our_term);
                break;
            // Dong Nai 4 - To may 1
            // Uab H1 DN4
            case "uab-h1-dn4":
                await getLcuDN4();
                await numberToVoice((parseInt(LCU2_DN4.A69)/10));
                await playAudio(mw);
            break;
            // Iab H1 DN4
            case "iab-h1-dn4":
                await getLcuDN4();
                await numberToVoice((parseInt(LCU2_DN4.A69)/10));
                await playAudio(mw);
            break;
            // P H1 DN4
            case "p1-dn4":
                await getLcuDN4();
                await numberToVoice((parseInt(LCU2_DN4.A69)/10));
                await playAudio(mw);
            break;
            // P H2 DN4
            case "p2-dn4":
                await getLcuDN4();
                await numberToVoice((parseInt(LCU2_DN4.A70)/10));
                await playAudio(mvar);
            break;
       
            case "p2-dn4":
                await getLcuDN4();
                await numberToVoice((parseInt(LCU2_DN4.A70)/10));
                await playAudio(mvar);
            break;
 
            default:
                await playAudio(unknown);

        }
        voiceSearch = '';

    }





}
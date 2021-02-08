import React, {useState} from 'react';

const Fullwidth = ()=>{

    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const reversal_map =
    {
        // [0-9]
        '\u0030': '\uff30',   '\u0031': '\uff11',   '\u0032': '\uff12',   '\u0033': '\uff13',   '\u0034': '\uff14',   '\u0035': '\uff15',   
        '\u0036': '\uff16',   '\u0037': '\uff17',   '\u0038': '\uff18',   '\u0039': '\uff19',

        // [A-Z]
        '\u0041': '\uff21',   '\u0042': '\uff22',   '\u0043': '\uff23',   '\u0044': '\uff24',   '\u0045': '\uff25',   '\u0046': '\uff26',
        '\u0047': '\uff27',   '\u0048': '\uff28',   '\u0049': '\uff29',   '\u004a': '\uff2a',   '\u004b': '\uff2b',   '\u004c': '\uff2c',
        '\u004d': '\uff2d',   '\u004e': '\uff2e',   '\u004f': '\uff2f',   '\u0050': '\uff30',   '\u0051': '\uff31',   '\u0052': '\uff32',
        '\u0053': '\uff33',   '\u0054': '\uff34',   '\u0055': '\uff35',   '\u0056': '\uff36',   '\u0057': '\uff37',   '\u0058': '\uff38',
        '\u0059': '\uff39',   '\u005a': '\uff3a',

        // [a-z]
        '\u0061': '\uff41',   '\u0062': '\uff42',   '\u0063': '\uff43',   '\u0064': '\uff44',   '\u0065': '\uff45',   '\u0066': '\uff46',
        '\u0067': '\uff47',   '\u0068': '\uff48',   '\u0069': '\uff49',   '\u006a': '\uff4a',   '\u006b': '\uff4b',   '\u006c': '\uff4c',
        '\u006d': '\uff4d',   '\u006e': '\uff4e',   '\u006f': '\uff4f',   '\u0070': '\uff50',   '\u0071': '\uff51',   '\u0072': '\uff52',
        '\u0073': '\uff53',   '\u0074': '\uff54',   '\u0075': '\uff55',   '\u0076': '\uff56',   '\u0077': '\uff57',   '\u0078': '\uff58',
        '\u0079': '\uff59',   '\u007a': '\uff5a',

        // symbols
        '\u0021': '\uff01',   '\u0022': '\uff02',   '\u0023': '\uff03',   '\u0024': '\uff04',   '\u0025': '\uff05',   '\u0026': '\uff26',
        '\u0027': '\uff27',   '\u0028': '\uff28',   '\u0029': '\uff29',   '\u002a': '\uff0a',   '\u002b': '\uff0b',   '\u002c': '\uff0c',
        '\u002d': '\uff0d',   '\u002e': '\uff0e',   '\u002f': '\uff0f',   '\u003a': '\uff1a',   '\u003b': '\uff1b',   '\u003c': '\uff1c',
        '\u003d': '\uff1d',   '\u003e': '\uff1e',   '\u003f': '\uff1f',   '\u0040': '\uff20',   '\u005b': '\uff3b',   '\u005c': '\uff3c',
        '\u005d': '\uff3d',   '\u005e': '\uff3e',   '\u005f': '\uff3f',   '\u0060': '\uff40',   '\u007b': '\uff5b',   '\u007c': '\uff5c',
        '\u007d': '\uff5d',   '\u007e': '\uff7e'
    };

    var complete_map;

    const scramble_text = (text)=>{
        if(!complete_map)
        {
            complete_map = { };
            for(var key in reversal_map)
            {
                var val = reversal_map[key];
                if(!reversal_map[val])
                    complete_map[reversal_map[key]] = key;
                complete_map[key] = val;
            }
        }

        var str = "";

        for (var i = 0; i < text.length; ++i)
        {
            var ch = text.charAt(i);
            var rev = complete_map[ch];
            if(rev)
                str += rev;
            else
                str += ch;
        }

        return str;
    }

    const on_scramble_text = ()=>{
        //var ob = document.getElementById(text_id);
        //var target = document.getElementById(target_id);

        //target.value = scramble_text(ob.value);
        setResult(scramble_text(text));
    }

    return (
        <div className="flex mx-auto items-center justify-center fixed top-0 right-0 h-screen w-screen">
            <form className="w-full max-w-xl bg-gray-900 rounded-lg px-4 pt-2">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <h2 className="px-4 pt-3 pb-2 text-gray-400 text-lg">ＦＵＬＬＷＩＤＴＨ Text Generator</h2>
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 w-full px-3 mb-2 mt-2">
                        <textarea className="bg-gray-800 rounded border border-gray-700 leading-normal resize-y h-48 w-full py-2 px-3 text-gray-400 placeholder-gray-700 focus:outline-none focus:bg-gray-900" 
                            name="body"
                            placeholder="ｈｅｌｌｏ ｓｔｒａｎｇｅｒ" 
                            value={text} onChange={(e)=>setText(e.target.value)}
                        ></textarea>
                        <textarea className="bg-gray-800 rounded border border-gray-700 leading-normal resize-y h-48 w-full py-2 px-3 text-gray-400 placeholder-gray-700 focus:outline-none focus:bg-gray-900" 
                            name="body" 
                            readonly
                            value={result}
                        ></textarea>
                    </div>
                    <div className="w-full flex items-start md:w-full px-3">
                        <div className="-mr-1">
                            <input type='submit' className="bg-gray-900 text-gray-300 font-medium py-1 px-4 border border-gray-600 rounded-lg tracking-wide mr-1 hover:bg-gray-900" 
                            value="Ｆｕｌｌｗｉｄｔｈ'ify" 
                            onClick={(event)=>{
                                event.preventDefault();
                                on_scramble_text();
                            }}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Fullwidth;
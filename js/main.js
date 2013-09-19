
/**
 * convert HSV to RGB
 *
 * @desc: easily modify hue, saturation, value for display
 * @args: 0 <= h, s, v <= 1
 * @ex: HSVtoRGB(0.5, 0.5, 0.5);
 *
 * @credit: http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately/17243070#17243070
 *
 */
 
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}


/**
 * make swatches
 *
 */

function createSwatches(){
    var tmp = '<a class="swatch"></a>';

    $('.row').each(function(){
        $(this).append(tmp + tmp + tmp + tmp + tmp + tmp + tmp + tmp + tmp + tmp + tmp);
    });
    
    colorSwatches();
}


/**
 * color swatches
 *
 */

// defaults
var hue = 0.5, /* 0 to 1 */
    sat = 0.4, 
    val = 1; 


function colorSwatches(){
    
    // hue gradient
    $('#hue .swatch').each(function(i){
        var hNew = i/10;
        setSwatch(this,hNew,sat,val);
    });
    
    // saturation gradient
    $('#saturation .swatch').each(function(i){
        var sNew = i/10;
        setSwatch(this,hue,sNew,val);
    });
    
    // value gradient
    $('#value .swatch').each(function(i){
        var vNew = i/10;
        setSwatch(this,hue,sat,vNew);
    });
    
};

function setSwatch(el,h,s,v) {
    
    var rgb = HSVtoRGB(h,s,v);
    var rgbCSS = 'RGB(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')'
    var tooltip =  'HSV(' + h + ', ' + s + ', ' + v + ')\n' + rgbCSS;

    $(el).css('background',rgbCSS)
        .data('colors',tooltip);
}


/**
 * tooltip
 *
 */
 
$('#swatches').hover(toggleTooltip,toggleTooltip); 
function toggleTooltip(){ 
    $('#tooltip').fadeToggle('fast'); 
};

$('body').on('mouseover','.swatch',function(event){
    var tooltip = $(this).data('colors');
    var x = event.clientX; 
    var y = event.clientY; 
    $('#tooltip').text(tooltip).css('left',x).css('top',y);;
    
});



/**
 * form
 *
 */

// set form to default values
function setForm(){
    $('#h').val(hue);
    $('#s').val(sat);
    $('#v').val(val);
}

// on change
$('form').on('change','input',function(){
    
    // console.log(this.id, this.value);
    switch(this.id) {
        case 'h':
            hue = this.value;
            $('#hue strong').show().delay(1000).fadeOut('slow');
            break;
        case 's':
            sat = this.value;
            $('#saturation strong').show().delay(1000).fadeOut('slow');
            break;
        case 'v':
            val = this.value;
            $('#value strong').show().delay(1000).fadeOut('slow');
            break;
        default:
            console.log('broken');
    }
    colorSwatches();

});


/**
 * make it so
 *
 */
createSwatches();
setForm();


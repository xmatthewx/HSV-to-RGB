/**
 * convert HSV to RGB
 *
 * @desc: easily modify hue, saturation, brightness for display
 * @args: 0 <= h, s, v <= 1
 * @ex: HSVtoRGB(0.5, 0.5, 0.5);
 *
 * @credit: http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately/17243070#17243070
 *
 */

function HSVtoRGB(h, s, br) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && br === undefined) {
        s = h.s, br = h.br, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = br * (1 - s);
    q = br * (1 - f * s);
    t = br * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = br, g = t, b = p; break;
        case 1: r = q, g = br, b = p; break;
        case 2: r = p, g = br, b = t; break;
        case 3: r = p, g = q, b = br; break;
        case 4: r = t, g = p, b = br; break;
        case 5: r = br, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}



/**
 * detauls
 *
 */
var hue = 0.9, /* 0 to 1 */
     sat = 0.4, 
     bri = 1; 


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


function colorSwatches(){
    
    // hue gradient
    $('#hue .swatch').each(function(i){
        var hNew = i/10;
        setSwatch(this,hNew,sat,bri);
    });
    
    // saturation gradient
    $('#saturation .swatch').each(function(i){
        var sNew = i/10;
        setSwatch(this,hue,sNew,bri);
    });
    
    // brightness gradient
    $('#brightness .swatch').each(function(i){
        var bNew = i/10;
        setSwatch(this,hue,sat,bNew);
    });
    
    
};

function setSwatch(el,h,s,b) {
    
    var rgb = HSVtoRGB(h,s,b);
    var rgbCSS = 'RGB(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')'
    var tooltip =  'HSV(' + h + ', ' + s + ', ' + b + ')\n' + rgbCSS;

    $(el).css('background',rgbCSS);
    var vals = $(el).data();
        vals.hue = h;
        vals.sat = s;
        vals.bri = b;
        vals.colors = tooltip;
        // console.log('hsv: ',h,s,b)
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
    $('#b').val(bri);
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
        case 'b':
            bri = this.value;
            $('#brightness strong').show().delay(1000).fadeOut('slow');
            break;
        default:
            console.log('broken');
    }
    colorSwatches();
    highlight();

});

function highlight(){
        
    $('.swatch').each( function(){
        var el = $(this);
        var vals = el.data();
        // console.log(vals.hue);

        if ( vals.sat == sat && vals.bri == bri && vals.hue == hue ) { 
            // console.log('match: ', match.s, vals.sat);
            el.addClass('active'); 
        } else { 
            el.removeClass('active'); 
        }
        
    });
    
}

/**
 * make it so
 *
 */
createSwatches();
setForm();


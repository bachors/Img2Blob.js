/************************************************
 * #### jQuery img2blob.js ####
 * Coded by Ican Bachors 2017.
 * http://ibacor.com/labs/jquery-image-to-blob/
 * Updates will be posted to this site.
 ***********************************************/
$.fn.img2blob = function(opt = {}) {
    var defaultopt = {
        watermark: '',
		fontStyle: 'Arial',
		fontSize: '30',
		fontColor: 'black',
		fontX: 10,
		fontY: 50
    };
	opt.watermark = (opt.watermark == undefined ? defaultopt.watermark : opt.watermark);
	opt.fontStyle = (opt.fontStyle == undefined ? defaultopt.fontStyle : opt.fontStyle);
	opt.fontSize = (opt.fontSize == undefined ? defaultopt.fontSize : opt.fontSize);
	opt.fontColor = (opt.fontColor == undefined ? defaultopt.fontColor : opt.fontColor);
	opt.fontX = (opt.fontX == undefined ? defaultopt.fontX : opt.fontX);
	opt.fontY = (opt.fontY == undefined ? defaultopt.fontY : opt.fontY);
	
    $(this).each(function(i, a) {
        var b = $(this).data('img2blob'),
            c = '.' + $(this).attr('class');
        getBlobUri(b, function(a) {
            $(c + ':eq(' + i + ')').attr('src', a)
        })
    });

    function getBlobUri(c, d) {
        var e = new Image();
        e.onload = function() {
            var a = document.createElement('canvas');
            a.width = this.naturalWidth;
            a.height = this.naturalHeight;
			var p = a.getContext('2d');
            p.drawImage(this, 0, 0);
			if(opt.watermark != ''){
				p.font = opt.fontSize + 'px ' + opt.fontStyle;
				p.fillStyle = opt.fontColor;
				p.fillText(opt.watermark, opt.fontX, opt.fontY);
			}
            var b = a.toDataURL('image/png'),
                binaryImg = DataUriToBinary(b),
                blobImg = new Blob([binaryImg], {
                    type: 'image/png'
                }),
                blobUri = window.URL.createObjectURL(blobImg);
            d(blobUri)
        };
        e.src = c
    }

    function DataUriToBinary(a) {
        var b = ';base64,';
        var c = a.indexOf(b) + b.length;
        var d = a.substring(c);
        var e = window.atob(d);
        var f = e.length;
        var g = new Uint8Array(new ArrayBuffer(f));
        for (i = 0; i < f; i++) {
            g[i] = e.charCodeAt(i)
        }
        return g
    }
}

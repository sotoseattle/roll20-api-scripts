on('chat:message',function(msg){
    if('api' === msg.type && msg.content.match(/^!hd/) ){
        
        var d20 = randomInteger(20);
        var dice = {
            " d4": {"limit":  4, "v": randomInteger(4)},
            " d6": {"limit":  8, "v": randomInteger(6)},
            " d8": {"limit": 12, "v": randomInteger(8)},
            "d10": {"limit": 16, "v": randomInteger(10)},
            "d12": {"limit": 20, "v": randomInteger(12)}};
        var die = chosen_die();
        var max = maximum_value();
        var html;
        
        function chosen_die() {
            for (var key in dice) {
                if (d20 <= dice[key]["limit"]) {return key;}}}
            
        function maximum_value() {
            maxo = 0;
            for (var key in dice) {
                if (maxo <= dice[key]["v"]) {maxo = dice[key]["v"];}}
            return maxo;}
        
        function html_banner(who) {
            return "<div style='background-color: rgba(112,32,130,1);" +
                    "padding: 0.5em; color: yellow;'>HD => " + who + "</div>";}
            
        function html_span_d20(v) {
            a = "<span> " + v + " </span>";
            if (v == 20) {
                a = "<span style='background-color: #FFFF00'>" + v + "</span>"}
            return a;}
            
        function html_table() {
            table = "<table><tbody>"
            for (var key in dice) {
                if (key == die) { table += "<tr style='background-color: Lightgreen;'>"} 
                else { table += '<tr>'}
            
                table += html_td_roll(key, " " + dice[key]["v"] + " ") + "</tr>"}
            table += "</tbody></table>"
            return table;}
            
        function html_cell_max(v) {
            if (v == max) { return "<td>max</td>" }
            else { return "<td></td>" }}
        
        function html_td_roll(a_die, value) {
            txt = "<td style='padding: 0.3em 0.5em 0.3em 1.5em;'>" + a_die + "</td>";
            txt += "<td style='padding: 0.3em 1.5em 0.3em 0.5em;'>[" + 
                    value + "]</td>" + html_cell_max(value)
            return txt;}
            
        function html_rolld20() {
            return "<div style='margin: 0.5em;'> rolling " + 
                html_td_roll("d20  ", html_span_d20(d20)) + 
                " ==> " + die + " [ " + dice[die]["v"] + " ] </div>"}
                
        html = "<div>" + 
                   html_banner(msg.who) +
                   html_rolld20() +
                   html_table() +
                   "</div>"
        
        sendChat('', html);
    }
});

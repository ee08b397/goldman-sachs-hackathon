// wellesley arreza
var i = 0;

            //https://pipes.yahoo.com/pipes/pipe.run?_id=ZKJobpaj3BGZOew9G8evXg&_render=json&ticker=GS%2CMSFT%2CIBM%2CGE
            //GS%2CMSFT%2CIBM%2CGE
            // %2

            $(document).ready(function() {
                var ticker = ""
                var str = "GS";
                var delimiter = "%2C";

                $("#add").on("click", function() {
                    alert("Stock added");
                    var ticker = $("#tickerstring").val();
                    addTicker(ticker);
                });

                function addTicker(ticker) {
                    str += delimiter + ticker.replace(",", delimiter);
                }


                //https://pipes.yahoo.com/pipes/pipe.run?_id=ZKJobpaj3BGZOew9G8evXg&_render=json&ticker=GS%2CMSFT
                setInterval(function() {
                    $.ajax({
                        url: 'https://pipes.yahoo.com/pipes/pipe.run?_id=ZKJobpaj3BGZOew9G8evXg&_render=json&ticker=' + str,
                        type: "GET",
                        dataType: "json",
                        success: function(data) {
                            console.log(data);
                            console.log("change" + data.value.items[0].change);
                            console.log("date" + data.value.items[0].date);
                            console.log("dayhigh" + data.value.items[0].dayhigh);
                            console.log("daylow" + data.value.items[0].daylow);
                            console.log("dayvolume" + data.value.items[0].dayvolume);
                            console.log("last" + data.value.items[0].last);


                            console.log(data[1]);
                            //setInterval(function () {
                            update(data);
                            //}, 1000);
                            console.log("NEW STRING" + str);
                        }
                    });
                }, 500);

                function update(data) {
                    $(data.value.items).each(function() {
                        console.log("Object");
                        console.log($(this)[0]);
                        var change = $(this)[0].change;
                        var symbol = $(this)[0].ticker;
                        var price = $(this)[0].last;
                        var low = $(this)[0].daylow;
                        var high = $(this)[0].dayhigh;
                        var dayvolume = $(this)[0].dayvolume;


                          // this is the image

                        var chart = $(this)[0].chart;
                        var dayvolume = $(this)[0].dayvolume;
                        var time = $(this)[0].time;
                        var link = $(this)[0].link;
                        var date = $(this)[0].date;




                        console.log("SYMBOL" + symbol);
                        // this finds the symbol like GS
                        var node = $("#feed").find("tbody").find("#" + symbol);

                        // check if node exists
                        if (node[0]) {
                            // $("#feed").find("tbody").find("#"+symbol).find('.Symbol').text(symbol);
                              node.find('.Symbol').text(symbol);
                            node.find('.Price').text(price);
                            node.find('.Change').text(change + "%");
                            node.find('.Low').text(low);
                            node.find('.High').text(high);

                           // node.find('.Chart').text(chart);
                            node.find('.Dayvolume').text(dayvolume);
                            node.find('.Time').text(time);
                            //node.find('.Link').text(link);
                            node.find('.Date').text(date);

                        }
                        // if not create new row.
                        else if (!(change === "N/A")) {

                            /*
                             *  <tr id="MSFT">
                             <td class="Symbol">MSFT</td>
                             <td class="Price">Stock</td>
                             <td class="Change">Stock</td>
                             <td class="Low">Stock</td>
                             <td class="High">Stock</td>
                             
                             </tr>
                             * 
                             */

                            console.log("cannot find");

                            $("#feed").find("tbody").append('<tr id="' + symbol + '">' +
                                    '<td class="Symbol">' + symbol + '</td>' +
                                    '<td class="Price">' + price + '</td>' +
                                    '<td class="Change">' + change + "%" + '</td>' +
                                    '<td class="Low">' + low + '</td>' +
                                    '<td class="High">' + high + '</td>' +
                                    /*
                                    '<td class="Chart">'+
                                    '<button onclick=\'+ 'alert('
                                    +chart+');\"'+
                                    
                    
                                    '></td>' */
                                    
                                    
                                    
                              
                                    
                                    
                                    '<td class="Dayvolume">' + dayvolume + '</td>' +
                                    '<td class="Time">' + time + '</td>' +
                                    '<td class="Link"><a href="' + link + '">'+symbol+'</a></td>' +
                                    '<td class="Date">' + date + '</td>' +
                                    '</tr>');
                             



                            /*
                             $("#feed").find("tbody").append('<tr id="'+symbol+'">'+
                             '<td class="Symbol">'+symbol+'</td>'+
                             '<td class="Price">'+price+'</td>'+
                             '<td class="Change">'+change+'</td>'+
                             '<td class="Low">'+low+'</td>'+
                             '<td class="High">'+high+'</td>'+
                             '</tr>');*/
                        }

                    });

                }

            });

$(document).ready(function () {
    $(".start").click(quiz);

    function quiz() {
        var score = [];
        var questions = [{
            img: "assets/img/airplane.png",
            q: "Which is the oldest airline in the world?",
            s: ["Avianca", "KLM", "Qantas"],
            a: 'KLM',
            correct: 1
        }, {
            img: "assets/img/car.png",
            q:" Which is the largest port in the world?",
            s: ["Port of Shanghai","Port of Singapore","Port of Rotterdam"],
            a:" Port of Shanghai",
            correct: 0
        }, {
            img: "assets/img/bus.png",
            q: "What is the longest distance cycling backwards?",
            s: ["89.30 km","675.10 km","337.60 km"],
            a: "337.60 km",
            correct: 2
        }, {
            img: "assets/img/bus.png",
            q: "What is the highest speed ever reached by a school bus?",
            s: ["590 km/h","320 km/h","245 km/h"],
            a: "590 km/h",
            correct: 0
        }, {
            img: "assets/img/van.png",
            q: "What is the longest car trip on one tank of gas?",
            s: ["2617 km","3568 km","1732 km"],
            a: "2617 km",
            correct: 0
        }];

        var counter = questions.length;
        console.log(counter);

//Esto agarra los datos de preguntas y respuestas de la matriz de preguntas y lo agrega a la div #questions:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#image").append('<img  id="' + i +'-img'+ '"class="img-responsive img-quest" src='+questions[i].img+'>');
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + btnRespuesta(questions[i].s, i)+'</form>');
            }
//mostrando solo la primera pregunta
            for (var j = questions.length - 1; j > 0; j--) {
                $('#' + j).hide();
                $('#' + j+'-img').hide();
            }
        }
// Esto toma las opciones de respuesta de la matriz de preguntas y las devuelve a createQuestion ():
        function btnRespuesta(array, numQ) {
            var answers = [];
            for (i = 0; i < array.length; i++) {
                answers.push('<div class="answer-sec"><button type="submit"  class="btn-answer"  name="' + numQ + '"value="' + array[i]+'"">'  + array[i] +'</button></div>');
            }
            return answers.join(" ");
            console.log(answers);
        }
//Respuestas correctas 
        function sumScore(questions) {
            return score.reduce(function (valorAnterior, valorActual) {
                return(valorAnterior + valorActual);
                console.log("valores la suma"+ valorAnterior + valorActual)
            });
        }
        
//commprobando la respuesta del usuario :
        function checkAnswer(answer, numQ, questions) {
            if (answer == questions[numQ].a) {
                questions[numQ].correct = 0;
                score.push(questions[numQ].correct);
            } else {
                score.push(questions[numQ].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".btn-answer").click(function (event) {
            event.preventDefault(); //Esto impide que el formulario se envíe
            var numQ = $(this).closest("form").attr("id"); //Esto nos da el número de la pregunta
            var userInput = $('button[' + numQ + ']:button:checked').val(); //Esto agarra la respuesta seleccionada del usuario
            if (counter > 1) {
                checkAnswer(userInput, numQ, questions);
                $("#" + numQ).hide();
                $("#" + numQ).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, numQ, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h2 class="result"></h2>');
                $(".result").text( sumScore(questions) + ' out of 5 correct!');
                   for (k = 0; k < score.length; k++) {
                        if (score[k] === 0) {
                            console.log(questions[k].q, questions[k].a);
                            $("#questions").append('<p class="text-danger text-left">' + questions[k].q + ' ' + questions[k].a + '</p>');
                        }
                    }
            } else {
                return false;
            }
        });
    }
});

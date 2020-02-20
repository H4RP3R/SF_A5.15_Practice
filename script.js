const URL = 'https://api.myjson.com/bins/jcmhn';


function getLabels(data) {
    let labels = [...new Set([...data.text.join().match(/{\w+}/gi)])];
    buildForm(labels.reverse());

}

function buildForm(labels) {
    labels.forEach(label => {
        let l = label.replace('{', '').replace('}', '');
        $('<input>').attr({
            type: 'text',
            id: l,
            name: l,
            placeholder: l,
            class: 'form-control',
        }).prependTo('.form-group');
    });
}

function getInputFields() {
    dict = {};
    $('input').each(function() {
        dict['{' + $(this).attr('name') + '}'] = $(this).val();
    });
    return dict
}

function changeText(data, dict) {
    text = data.text.join('<br>');
    for (key in dict) {
        text = text.replace(new RegExp(key, 'g'), dict[key]);
    }
    return text

}

function renderMessage(text) {
    $('#result').html(text);
}

function buttonHandler(data) {
    $('#create').click(function() {
        dict = getInputFields();
        text = changeText(data, dict);
        renderMessage(text);
    });
}

$(document).ready(function() {
    $.getJSON(URL, function(data) {
        getLabels(data);
        buttonHandler(data);
    });
});

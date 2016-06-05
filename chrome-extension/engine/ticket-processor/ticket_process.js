var exception_handler = {
    getTickets: function() {
        $.ajax({
            url: 'http://example.com/',
            type: 'PUT',
            data: 'ID=1&Name=John&Age=10', // or $('#myform').serializeArray()
            success: function() { alert('PUT completed'); }
        });
    }
}
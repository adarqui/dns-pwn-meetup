var dns = require('native-dns'),
	server = dns.createServer();

server.on('request', function (request, response) {
	response.answer.push(dns.A({
		name: request.question[0].name,
		address: process.argv[2],
		ttl: 600,
	}));
	console.log(request);
	response.send();
});

server.on('error', function (err, buff, req, res) {
	console.log(err.stack);
});

try {
	server.serve(53);
} catch(err) {
	console.log(err);
	process.exit(-1);
}

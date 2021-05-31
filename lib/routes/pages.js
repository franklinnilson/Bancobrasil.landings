const routes = require('express').Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../../config/config');
const multer = require("multer");
const multipart = multer();
const jwt = require('jsonwebtoken');
const utm = require('url-utm-params');
routes.use(cookieParser());

const soap = require('soap');

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

const landingPage = require('../api/landing-api');

routes.get('/', (req, res, next) => {
    res.render( 'index',
        {
            apiUrl: config.apiUrl,
        }
    );
});

// routes.get('/form-principal', (req, res, next) => {
//     const url = 'https://wm.bbmapfre.com.br/ws/bsServicosPortalAdmin.ws.provider.AgendamentoCotacaoWS/AgendamentoCotacaoWSPort?WSDL';
//     const wsdlOptions = {
//         envelopeKey: 'soapenv',
//         'overrideRootElement': {
//         'namespace': 'tns',
//         }
//     };

//     soap.createClient(url, wsdlOptions, (err,client)=>{
//         if(err) return console.error(err);

//           client.gerarLead({'clGerarLeadEntrada' : {
//             codCpfCnpjCliente: '17979863097',
//             codPortal: '2348720180928163502603',
//             desEmailCliente: "teste4@teste.com.br",
//             dtFuturaContato: "2021-05-05T19:00:00",
//             flgReceberSMS: false,
//             namCliente: "TESTE LEAD AUTO - IGNORAR",
//             numCelular: "994551999",
//             numDDDCelular: "11",
//             flgClienteBV: 'FALSE',
//             flgCorrentistaBB: 'FALSE',
//             flgWorkSite: 'FALSE',
//             numNivel: 0
//         }}, (err,data)=>{
//             if (err) return console.log(err)
//             console.log(data.return.desReciboAgendamento);
//         });
//     });
    
// });


// routes.get('/form-principal', (req, res, next) => {
//     const url = 'https://wm.bbmapfre.com.br:443/ws/bsServicosPortalAdmin.ws.provider:AgendamentoCotacaoWS/AgendamentoCotacaoWSPort?WSDL';
//     const username = 'wmagendbseg';
//     const password = '1123@gend!PRD#';
//     const security = new soap.BasicAuthSecurity(username, password);
//     const wsdl_headers = {};
//     security.addHeaders(wsdl_headers);
    
//     soap.createClient(url, { wsdl_headers }).then((err, client) => {


routes.get('/form-principal', (req, res, next) => {
    const url = 'https://wm.bbmapfre.com.br:443/ws/bsServicosPortalAdmin.ws.provider:AgendamentoCotacaoWS/AgendamentoCotacaoWSPort?WSDL';
    const username = 'wmagendbseg';
    const password = '1123@gend!PRD#';
    const security = new soap.BasicAuthSecurity(username, password);
    const wsdlHeaders = {};
    security.addHeaders(wsdlHeaders);
    const wsdlOptions = {
        envelopeKey: 'soapenv',
        'overrideRootElement': {
            'namespace': 'tns',
        }
    };

    soap.createClient(url, { wsdlOptions, wsdlHeaders }, (err,client)=>{
        if(err) return console.error(err);

          client.gerarLead({'clGerarLeadEntrada' : {
            codCpfCnpjCliente: '17979863097',
            codPortal: '2348720180928163502603',
            desEmailCliente: "teste4@teste.com.br",
            dtFuturaContato: "2021-05-05T19:00:00",
            flgReceberSMS: false,
            namCliente: "TESTE LANDING BB AUTO - IGNORAR",
            numCelular: "994551999",
            numDDDCelular: "11",
            flgClienteBV: 'FALSE',
            flgCorrentistaBB: 'FALSE',
            flgWorkSite: 'FALSE',
            numNivel: 0
        }}, (err,data)=>{
            if (err) return console.log(err)
            console.log(data.return.desReciboAgendamento);
        });
    });
    
});


module.exports = routes;

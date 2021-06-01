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


routes.post('/call-me-now', multipart.fields([]), (req, res, next) => {
    const params = JSON.parse(JSON.stringify(req.body));
    let ligacao = landingPage.ligacao.callMeNow(params.telefone);
    ligacao.then((v) => {
        res.json({ 
            success: true,
            request: v
        });
    });
});

routes.post('/cotacao', multipart.fields([]), (req, res, next) => {
    const params = JSON.parse(JSON.stringify(req.body));

    const security = new soap.BasicAuthSecurity(config.usernameMapfre, config.passwordMapfre);
    const wsdlHeaders = {};
    security.addHeaders(wsdlHeaders);
    const wsdlOptions = {
        envelopeKey: 'soapenv',
        'overrideRootElement': {
            'namespace': 'tns',
        }
    };

    soap.createClient(config.urlApiMapfre, { wsdlOptions, wsdlHeaders }, (err,client)=>{
        if(err) return console.error(err);

          client.gerarLead({'clGerarLeadEntrada' : {
            codCpfCnpjCliente: params.codCpfCnpjCliente,
            codPortal: config.codPortal,
            desEmailCliente: params.desEmailCliente,
            dtFuturaContato: params.dtFuturaContato,
            flgReceberSMS: false,
            namCliente: params.namCliente,
            numCelular: params.numCelular,
            numDDDCelular:  params.numDDDCelular,
            flgClienteBV: 'FALSE',
            flgCorrentistaBB: 'FALSE',
            flgWorkSite: 'FALSE',
            numNivel: 0
        }}, (err,data)=>{
            if(err){
                res.json({ 
                    response: err,
                    success: false
                });
            }
            if(data.return){
                res.json({ 
                    response: data.return.desReciboAgendamento,
                    success: true
                });
            }
        });
    });
});


module.exports = routes;

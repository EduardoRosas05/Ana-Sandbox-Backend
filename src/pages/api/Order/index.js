import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addOrder(req, res);
        case 'GET':
            return listOrder(req, res);
        case 'DELETE':
            return deleteOrder(req, res);
        case 'PUT':
            return updateOrder(req,res);
        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

const addOrder = async (req, res) =>  {

        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
            const order = await db.Order.create({...req.body});
    
            res.json({
                order,
                message: 'La Orden se ha creada'
            })
        }catch(error){
            console.log(error);
            let errors = []
    
            if(error.errors){
                //extrae la info y la mapea
                errors = error.errors.map((item) => ({
                    error: item.message, 
                    field: item.path,
                }));
            }
    
            return res.status(400).json({
                message: `Ocurrió un error al procesar la petición: ${error.message}`,
                errors,
            })
        }
}

const listOrder = async (req, res) => {
    
        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
        const order = await db.Order.findAll({
            
        });
            
            return res.json(order)
        
        }catch(error){
            console.log(error);
            let errors = []
    
            if(error.errors){
                //extrae la info y mapear el error
                errors = error.errors.map((item) => ({
                    error: item.message, 
                    field: item.path,
                }));
            }
    
            return res.status(400).json({
                message: `Ocurrió un error al procesar la petición: ${error.message}`,
                errors,
            })
        }
}

const deleteOrder = async (req,res) => {

    try{

      const {id} = req.query;

        await db.Order.destroy({
            where: { id: id }
        })

        res.json({
            message: 'La orden a sido eliminada'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de borrar la orden"})
    }
}

const updateOrder = async (req,res) => {

    try{
        let {id} = req.query;
        await db.Order.update({...req.body},
            {
            where :{ id : id }
        })
     
        res.json({
            message: 'La orden fue actualizado'
        })

      }
      catch (error) {

        console.log(error);

        let errors = [];
        if (error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
                }));
        }
      return res.status(400).json( {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors,
        } 
      )
    }
}

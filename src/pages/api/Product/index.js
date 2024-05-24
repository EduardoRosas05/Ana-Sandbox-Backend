import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addProduct(req, res);
        case 'GET':
            return listProduct(req, res);
        case 'DELETE':
            return deleteProduct(req, res);
        case 'PUT':
            return updateProduct(req,res);
        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

const addProduct = async (req, res) =>  {

        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
            const product = await db.Product.create({...req.body});
    
            res.json({
                product,
                message: 'El producto se ha creada'
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

const listProduct = async (req, res) => {
    
        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
        const product = await db.Product.findAll({
            
        });
            
            return res.json(product)
        
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

const deleteProduct = async (req,res) => {

    try{

      const {id} = req.query;

        await db.Product.destroy({
            where: { id: id }
        })

        res.json({
            message: 'El producto a sido eliminado'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de borrar el producto"})
    }
}

const updateProduct = async (req,res) => {

    try{
        let {id} = req.query;
        await db.Product.update({...req.body},
            {
            where :{ id : id }
        })
     
        res.json({
            message: 'El producto fue actualizado'
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

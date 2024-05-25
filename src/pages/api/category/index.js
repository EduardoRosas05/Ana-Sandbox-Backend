import db from '../../../../database/models'

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addCategory(req, res);
        case 'GET':
            return listCategory(req, res);
        case 'DELETE':
            return deleteCategory(req, res);
        case 'PUT':
            return updateCategory(req,res);
        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

const addCategory = async (req, res) =>  {

        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
            const category = await db.Category.create({...req.body});
    
            res.json({
                category,
                message: 'La Categoria fue creada'
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

const listCategory = async (req, res) => {
    
        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
        const category = await db.Category.findAll({
            include: ['nombre', 'codigo']
        });
            
            return res.json(category)
        
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

const deleteCategory = async (req,res) => {

    try{

      const {id} = req.query;

        await db.Category.destroy({
            where: { id: id }
        })

        res.json({
            message: 'La categoria a sido eliminada'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de borrar la categoria"})
    }
}

const updateCategory = async (req,res) => {

    try{
        let {id} = req.query;
        await db.Category.update({...req.body},
            {
            where :{ id : id }
        })
     
        res.json({
            message: 'La categoria fue actualizado'
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

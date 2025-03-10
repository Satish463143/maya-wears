import React from 'react'
import { PaymentOptionsCompoent } from '../../Middlewares/Form/Input.component'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./PlaceOrder.form.css"

const PlaceOrderForm = ({submitEvent,loading}) => {
    const orderDto = Yup.object({
        paymentType: Yup.object({
          label: Yup.string().matches(/^(Cash on delivery|Pay by E-sewa)$/),
          value: Yup.string()
            .matches(/^(Cash on delivery|Esewa)$/)
            .required(),
        }).required(),
      });

      const {control,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver(orderDto),
      });
  return (
    <form onSubmit={handleSubmit(submitEvent)} className='order_promo'>
      <div>
        <PaymentOptionsCompoent
          name='paymentType'
          control={control}
          errMsg={errors?.paymentType?.message}
          required
          style={{height:'55px !important'}}
        />
      </div>
        
      <div>
        <input            
          className="submit_btn hoverBotton cart__buy place_order_button"
          type="submit"
          value="Place order"
          disabled={loading}
          style={{ cursor: "pointer" }}
        />
      </div>
  </form>
  )
}

export default PlaceOrderForm